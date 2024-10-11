import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

interface DateSelectorProps {
    onDateChange: (date: string | null) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ onDateChange }) => {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

    const handleDateChange = (date: Dayjs | null) => {
        setSelectedDate(date);
        onDateChange(date?.format('YYYY-MM-DD') || null);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={handleDateChange}
            />
        </LocalizationProvider>
    );
}

export  default DateSelector;
                
