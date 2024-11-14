import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AnalyticsDashboard() {
    const [analytics, setAnalytics] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://localhost:5000/analytics');
            setAnalytics(result.data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Analytics</h1>
            <p>Total Sent: {analytics.total_sent}</p>
            <p>Pending: {analytics.pending}</p>
            <p>Failed: {analytics.failed}</p>
        </div>
    );
}

export default AnalyticsDashboard;
