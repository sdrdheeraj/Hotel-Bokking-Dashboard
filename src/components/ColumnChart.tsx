// src/components/ColumnChart.tsx
import React from 'react';
import Chart from 'react-apexcharts';

interface ColumnChartProps {
    data: { country: string; visitors: number }[];
}

const ColumnChart: React.FC<ColumnChartProps> = ({ data }) => {
    const options = {
        chart: {
            type: 'bar' as 'bar', // Explicitly set the type
        },
        xaxis: {
            categories: data.map((d) => d.country),
        },
        title: {
            text: 'Number of Visitors per Country',
        },
    };

    return (
        <Chart
            options={options}
            series={[{ name: 'Visitors', data: data.map((d) => d.visitors) }]}
            type="bar"
            height={350}
        />
    );
};

export default ColumnChart;
