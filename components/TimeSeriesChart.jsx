import React, { useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const TimeSeriesChart = ({ data }) => {
    const chartData = useMemo(() => {
        const filteredData = {};
    
        data.forEach(entry => {
            const formattedDate = `${entry.arrival_date_year}-${String(entry.arrival_date_month).padStart(2, '0')}-${String(entry.arrival_date_day_of_month).padStart(2, '0')}`;
            
            const totalVisitors = Number(entry.adults + entry.children + entry.babies);
    
            if (filteredData[formattedDate]) {
                filteredData[formattedDate] += totalVisitors;
            } else {
                filteredData[formattedDate] = totalVisitors;
            }
        });

        return Object.keys(filteredData).map(date => ({
            date,
            totalVisitors: filteredData[date],
        }));
    }, [data]);
    

    const chartStyles = {
        container: {
            height: '300px',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
        },
        title: {
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '16px',
            color: '#333',
        },
    };

    return (
        <div style={chartStyles.container}>
            <h2 style={chartStyles.title}>Visitors Over Time</h2>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <XAxis 
                        dataKey="date" 
                        tickFormatter={(date) => new Date(date).toLocaleDateString()} 
                    />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line 
                        type="monotone" 
                        dataKey="totalVisitors" 
                        stroke="#8884d8"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TimeSeriesChart;
