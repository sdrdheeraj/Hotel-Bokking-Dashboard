// src/components/TimeSeriesChart.tsx
import React from 'react';
import Chart from 'react-apexcharts';

interface TimeSeriesChartProps {
    data: { x: number; y: number }[];
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data }) => {
    const options = {
        chart: {
            zoom: { enabled: true },
        },
        xaxis: {
            type: 'datetime' as 'datetime', // Explicitly set the type
        },
        title: {
            text: 'Number of Visitors per Day',
        },
    };

    return (
        <Chart
            options={options}
            series={[{ name: 'Visitors', data }]}
            type="line"
            height={350}
        />
    );
};

export default TimeSeriesChart;
