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
    const adminKey = state.adminKey;

    if (!state.isAdminAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center py-8 px-4">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Odmowa dostępu</h1>
                <p className="mb-6">Musisz się zalogować jako admin aby zobaczyć tę stronę. Proszę
                    <a href="/admin" className="text-blue-600 hover:text-blue-800 ml-1">
                        {'zaloguj się '}
                    </a>
                     jako admin.
                </p>
            </div>
        );
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
                    'Admin-Secret-Key': adminKey,
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
        <div className="max-w-lg mx-auto my-10 p-5 border border-gray-200 rounded shadow bg-white">
            <h1 className="text-2xl font-semibold mb-6">Statystyki Zamówień</h1>
            <Formik
                initialValues={{ startDate: '', endDate: '' }}
                onSubmit={({ startDate, endDate }, { setSubmitting }) => {
                    fetchStatistics(startDate, endDate);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4">
                        <Field
                            type="date"
                            name="startDate"
                            required
                            className="form-input mt-1 block w-full border py-2 px-3 shadow rounded"
                        />
                        <Field
                            type="date"
                            name="endDate"
                            required
                            className="form-input mt-1 block w-full border py-2 px-3 shadow rounded"
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-yellow-500 text-white font-bold uppercase text-lg px-4 py-2 rounded shadow hover:bg-yellow-600 focus:outline-none focus:shadow-outline transition ease-in-out duration-300 w-full"
                        >
                            Wyświetl Statystyki
                        </button>
                    </Form>
                )}
            </Formik>
            {loading && <p className="text-center">Loading statistics...</p>}
            {error && <p className="error text-red-500 text-center">{error}</p>}
            {statistics && (
                <div className="mt-4 space-y-2">
                    <p>Liczba zamówień na wynos: {statistics.takeAwayCount}</p>
                    <p>Liczba zamówień na miejscu: {statistics.dineInCount}</p>
                    <p>Suma wartości zamówień na wynos: {statistics.totalTakeAwayPrice}</p>
                    <p>Suma wartości zamówień na miejscu: {statistics.totalDineInPrice}</p>
                    <p>Suma wartości zamówień ogółem: {statistics.totalPrice}</p>
                </div>
            )}
            <button
                onClick={() => navigate('/admin-panel')}
                className="bg-red-500 text-white font-bold uppercase text-lg px-6 py-2 rounded shadow hover:bg-red-600 focus:outline-none focus:shadow-outline transition ease-in-out duration-300 mt-4"
            >
                Wróć do panelu admina
            </button>
        </div>
    );

};

export default Statistics;
