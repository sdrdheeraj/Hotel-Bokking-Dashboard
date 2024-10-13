// src/services/dataService.ts
import axios from "axios";
import Papa from "papaparse";
import { BookingData } from "../types/BookingData";

const fetchData = async () => {
  const response = await axios.get(
    "hotel_bookings.csv"
  );
  const data = response.data;

  return parseCSV(data);
};

const parseCSV = (data: string): BookingData[] => {
  const parsedData: BookingData[] = [];
  Papa.parse(data, {
    header: true,
    dynamicTyping: true,
    complete: (results) => {
      parsedData.push(...(results.data as BookingData[]));
    },
  });
  return parsedData;
};

export { fetchData };
