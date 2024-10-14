import React, { useState, useEffect } from "react";
import TimeSeriesChart from "./TimeSeriesChart";
import ColumnChart from "./ColumnChart";
import SparklineChart from "./SparklineChart";
import { fetchBookingData } from "../services/apiService";
import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("2014-01-01"); 
  const [endDate, setEndDate] = useState("2017-12-31");

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchBookingData(startDate, endDate);
        setData(result);
      } catch (error) {
        console.error("Error fetching booking data", error);
      }
    };
    loadData();
  }, [startDate, endDate]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") setStartDate(value); 
    if (name === "endDate") setEndDate(value);
  };

  return (
    <div className="dashboard-container">
      <div className="date-picker">
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={startDate} 
            onChange={handleDateChange}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={endDate} 
            onChange={handleDateChange}
          />
        </label>
      </div>
      <div className="charts">
        <TimeSeriesChart data={data} />
        <ColumnChart data={data} />
        <div className="sparkline-charts">
          <SparklineChart data={data} type="adults" />
          <SparklineChart data={data} type="children" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
