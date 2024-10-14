import React, { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const SparklineChart = ({ data, type }) => {
    const [total, setTotal] = useState(0);
    const seriesData = useMemo(() => {
        let totalVisitors = 0;
    
        const visitorsData = data.map(entry => {
            let visitors = 0;
            if(type == 'children'){
                visitors = Number(entry.children + entry.babies);
                totalVisitors += visitors;
            }else{
                visitors = Number(entry.adults)
                totalVisitors += visitors;
            }
    
            return {
                value: visitors
            };
        });
        setTotal(totalVisitors);
        return visitorsData;
    }, [data]);

    const chartStyles = {
        container: {
            height: '200px',
            width: '100%',
            padding: '5px',
            margin: '20px 0px',
            borderRadius: '8px',
            boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
        },
    };

    return (
        <div style={chartStyles.container}>
            <ResponsiveContainer width="100%" height="100%">
            <h3>{type}</h3>
            <p>Total: {total}</p>
                <LineChart data={seriesData}>
                    <XAxis dataKey="value" hide />
                    <YAxis hide />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SparklineChart;