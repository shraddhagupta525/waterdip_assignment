import React, { useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const ColumnChart = ({ data }) => {
    const groupedData = useMemo(() => {
        return data.reduce((acc, entry) => {
            const { country, adults, children, babies } = entry;
            acc[country] = adults + children + babies; 
            return acc;
        }, {});
    }, [data]);
    

    const chartData = useMemo(() => {
        return Object.entries(groupedData).map(([country, visitors]) => ({
            country,
            visitors
        }));
    }, [groupedData]);

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
            <h2 style={chartStyles.title}>Visitors by Country</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <XAxis dataKey="country" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="visitors" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ColumnChart;