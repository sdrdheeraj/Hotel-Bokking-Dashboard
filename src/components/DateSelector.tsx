// src/components/DateSelector.tsx
import React, { useState } from 'react';
import moment from 'moment';

interface DateSelectorProps {
    onDateChange: (startDate: Date, endDate: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ onDateChange }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleChange = () => {
        if (startDate && endDate) {
            onDateChange(startDate, endDate);
        }
    };

    return (
        <div>
            <input
                type="date"
                onChange={(e) => {
                    const date = new Date(e.target.value);
                    setStartDate(date);
                    handleChange();
                }}
            />
            <input
                type="date"
                onChange={(e) => {
                    const date = new Date(e.target.value);
                    setEndDate(date);
                    handleChange();
                }}
            />
        </div>
    );
};

export default DateSelector;
