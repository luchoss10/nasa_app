import React, {useEffect, useState} from 'react';
import './App.css';
import { Slice } from './components/Slice';
import { Grid } from './components/Grid';
//import { LocalizationProvider } from '@mui/x-date-pickers';
//import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
//import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Header from './components/Header';
import dayjs  from 'dayjs';

// const API_KEY = 'DEMO_KEY';
const API_KEY = process.env.REACT_APP_NASA_API_KEY;
const APOD_API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
const ROVER_API_URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${API_KEY}`;

interface Photo {
  title: string;
  url: string;
  explanation: string;
}

function App() {

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isRoverPhotos, setIsRoverPhotos] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  
  console.log(selectedDate);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        
        let url:string = isRoverPhotos ? ROVER_API_URL : APOD_API_URL;
        if (selectedDate) {
            const formattedDate:string = selectedDate;
            const lastYearFormattedDate = dayjs(selectedDate).subtract(1, 'month').format('YYYY-MM-DD');
            
            url = isRoverPhotos ? `${url}&earth_date=${formattedDate}` : `${url}&end_date=${formattedDate}&start_date=${lastYearFormattedDate}`;
        } else {
            const today = dayjs().format('YYYY-MM-DD');
            url = isRoverPhotos ? `${url}&earth_date=${today}` : `${url}&count=5`;
        }
        console.log(url);

        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        if (isRoverPhotos) {
          setPhotos(data.photos.slice(0, 5).map((photo: any) => ({
            title: photo.camera.full_name,
            url: photo.img_src,
            explanation: `
              Rover: ${photo.rover.name},
              Camera: ${photo.camera.full_name},
              Earth Date: ${photo.earth_date}
            `,
          })));
        } else {
            setPhotos(data);
        }
      } catch (error) {
        console.error('Error fetching data from NASA API', error);
      }
  }
  fetchPhotos();
  }
  , [isRoverPhotos, selectedDate]);

const toggleEndpoint = () => {
  setIsRoverPhotos(!isRoverPhotos);
};

const handleDateChange = (formattedDate: string | null) => {
    setSelectedDate(formattedDate);
};

  return (
    <div className="App">
      <Header
        isRoverPhotos={isRoverPhotos}
        toggleEndpoint={toggleEndpoint}
        onDateChange={handleDateChange}
        />
      <Grid>
      {photos.map((photo, index) => (
          <Slice
            key={index}
            title={photo.title}
            imageUrl={photo.url}
            body={photo.explanation}
          />
        ))}
      </Grid>
    </div>
  );
}

export default App;
