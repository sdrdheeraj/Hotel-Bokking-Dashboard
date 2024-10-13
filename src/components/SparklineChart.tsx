// src/components/SparklineChart.tsx
import React from 'react';
import Chart from 'react-apexcharts';

interface SparklineChartProps {
    data: number[];
}

const SparklineChart: React.FC<SparklineChartProps> = ({ data }) => {
    const options = {
        chart: {
            type: 'line' as 'line', // Explicitly set the type
            sparkline: {
                enabled: true,
            },
        },
        stroke: {
            curve: 'smooth' as 'smooth', // Explicitly set curve type
        },
        title: {
            text: 'Visitor Trends',
        },
        tooltip: {
            enabled: false, // Disable tooltip for sparkline
        },
    };

    return (
        <Chart
            options={options}
            series={[{ name: 'Visitors', data }]}
            type="line" // Ensure this matches the chart type
            height={100} // Adjust height for sparkline
        />
    );
};

export default SparklineChart;
