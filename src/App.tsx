// src/App.tsx
import React, { useEffect, useState } from "react";
import { fetchData } from "./services/dataService";
import DateSelector from "./components/DateSelector";
import TimeSeriesChart from "./components/TimeSeriesChart";
import ColumnChart from "./components/ColumnChart";
import SparklineChart from "./components/SparklineChart";
import { BookingData } from "./types/BookingData";

const App: React.FC = () => {
  const [data, setData] = useState<BookingData[]>([]);
  const [filteredData, setFilteredData] = useState<BookingData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
      setFilteredData(fetchedData); // Set initial filtered data
    };
    loadData();
  }, []);

  const handleDateChange = (startDate: Date, endDate: Date) => {
    const filtered = data.filter((booking) => {
      const bookingDate = new Date(
        `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`
      );
      return bookingDate >= startDate && bookingDate <= endDate;
    });
    setFilteredData(filtered);
  };

  const getVisitorsPerDay = () => {
    const visitorsPerDay: { x: number; y: number }[] = [];
    const groupedData: { [key: string]: number } = {};

    filteredData.forEach((booking) => {
      const date = `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`;
      groupedData[date] =
        (groupedData[date] || 0) +
        booking.adults +
        booking.children +
        booking.babies;
    });

    for (const date in groupedData) {
      visitorsPerDay.push({
        x: new Date(date).getTime(),
        y: groupedData[date],
      });
    }

    return visitorsPerDay;
  };

  const getVisitorsPerCountry = () => {
    const countryData: { [key: string]: number } = {};

    filteredData.forEach((booking) => {
      countryData[booking.country] =
        (countryData[booking.country] || 0) +
        booking.adults +
        booking.children +
        booking.babies;
    });

    return Object.entries(countryData).map(([country, visitors]) => ({
      country,
      visitors,
    }));
  };

  const getTotalAdults = () => {
    return filteredData.map((booking) => booking.adults);
  };

  const getTotalChildren = () => {
    return filteredData.map((booking) => booking.children);
  };

  return (
    <div>
      <h1>Hotel Booking Dashboard</h1>
      <DateSelector onDateChange={handleDateChange} />
      <TimeSeriesChart data={getVisitorsPerDay()} />
      <ColumnChart data={getVisitorsPerCountry()} />
      <SparklineChart data={getTotalAdults()} />
      <SparklineChart data={getTotalChildren()} />
    </div>
  );
};

export default App;
