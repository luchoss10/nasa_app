import React from 'react';
import { Button } from '@mui/material';
import DateSelector  from './DateSelector';

interface HeaderProps {
    isRoverPhotos: boolean;
    toggleEndpoint: () => void;
    onDateChange: (date: string | null) => void;
}


const Header: React.FC<HeaderProps> = ({isRoverPhotos, toggleEndpoint, onDateChange}) => {
    return (
    <header className="App-header">
      <h1>NASA Photos</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
        <Button onClick={toggleEndpoint} variant="contained">
          {isRoverPhotos ? 'APOD' : 'Curiosity Rover'}
        </Button>
        {/* Componente DateSelector */}
        <DateSelector onDateChange={onDateChange} />
      </div>
    </header>
    );
};

export default Header;
