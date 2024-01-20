import React, { useState, useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';

const Statistics = () => {
    const navigate = useNavigate();
    const { state } = useContext(AdminContext);
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!state.isAdminAuthenticated) {
        return <p>Access Denied. Please <a href="/admin">login</a> as an admin to view this page.</p>;
    }

    const fetchStatistics = async (startDate, endDate) => {
        setLoading(true);
        setError('');

        // Ensure dates start at 00:00:00 and end at 23:59:59
        const formattedStartDate = new Date(startDate).setHours(0, 0, 0, 0);
        const formattedEndDate = new Date(endDate).setHours(23, 59, 59, 999);

        try {
            const response = await axios.get('http://localhost:3001/api/admin/statistics/orders', {
                params: {
                    startDate: new Date(formattedStartDate).toISOString(),
                    endDate: new Date(formattedEndDate).toISOString()
                },
                headers: {
                    'Admin-Secret-Key': 'admin',
                }
            });
            setStatistics(response.data);
        } catch (error) {
            setError('Failed to fetch statistics. Please try again.');
            console.error('Error fetching statistics:', error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="statistics-container">
            <h1>Statystyki Zamówień</h1>
            <Formik
                initialValues={{ startDate: '', endDate: '' }}
                onSubmit={({ startDate, endDate }, { setSubmitting }) => {
                    fetchStatistics(startDate, endDate);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="date" name="startDate" required />
                        <Field type="date" name="endDate" required />
                        <button type="submit" disabled={isSubmitting}>Wyświetl Statystyki</button>
                    </Form>
                )}
            </Formik>
            {loading && <p>Loading statistics...</p>}
            {error && <p className="error">{error}</p>}
            {statistics && (
                <div>
                    <p>Liczba zamówień na wynos: {statistics.takeAwayCount}</p>
                    <p>Liczba zamówień na miejscu: {statistics.dineInCount}</p>
                    <p>Suma wartości zamówień na wynos:: {statistics.totalTakeAwayPrice}</p>
                    <p>Suma wartości zamówień na miejscu: {statistics.totalDineInPrice}</p>
                    <p>Suma wartości zaówień ogółem: {statistics.totalPrice}</p>
                </div>
            )}
            <button onClick={() => navigate('/admin-panel')}>Wróć do panelu admina</button>
        </div>
    );
};

export default Statistics;
