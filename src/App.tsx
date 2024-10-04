import React, {useEffect, useState} from 'react';
import './App.css';
import { Slice } from './components/Slice';
import { Grid } from './components/Grid';


// const API_KEY = 'DEMO_KEY';
const API_KEY = process.env.REACT_APP_NASA_API_KEY;
console.log('API_KEY', API_KEY);
const APOD_API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=5`;
// const ROVER_API_URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`;

interface Photo {
  title: string;
  url: string;
  explanation: string;
}

function App() {

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isRoverPhotos, setIsRoverPhotos] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(isRoverPhotos ? APOD_API_URL : APOD_API_URL);
        const data = await response.json();
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
  , [isRoverPhotos]);

const toggleEndpoint = () => {
  setIsRoverPhotos(!isRoverPhotos);
};

  return (
    <div className="App">
      <header className="App-header">
        <h1>NASA Photos </h1>
        <button onClick={toggleEndpoint}>
          {isRoverPhotos ? 'APOD' : 'Curiosity Rover'}
        </button>
      </header>
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
