import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AdminLogin = () => {
    const { dispatch } = useContext(AdminContext);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleAdminLogin = async (values, { setSubmitting }) => {
        try {
            const response = await fetch('http://localhost:3001/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Admin-Secret-Key': values.adminKey
                }
            });

            if (response.ok) {
                const adminData = await response.json();
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: adminData,
                    adminKey: values.adminKey
                });
                navigate('/admin-panel'); // Redirect to the admin panel on successful login
            } else {
                alert('Invalid Admin Key');
            }
        } catch (error) {
            console.error('Error during admin login:', error);
            alert('An error occurred during login.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center p-5">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Login</h1>
            <Formik
                initialValues={{ adminKey: '' }}
                onSubmit={handleAdminLogin}
            >
                {({ isSubmitting }) => (
                    <Form className="w-full max-w-xs">
                        <div className="mb-4">
                            <Field
                                type="password"
                                name="adminKey"
                                placeholder="Enter Admin Key"
                                className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-yellow-500 text-white font-bold uppercase text-lg px-4 py-2 rounded shadow hover:bg-yellow-600 focus:outline-none focus:shadow-outline transition ease-in-out duration-300 w-full"
                            >
                                Login
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            <button
                onClick={handleGoBack}
                className="mt-4 text-gray-500 text-xs hover:text-blue-700 transition ease-in-out duration-300"
            >
                Go Back
            </button>
        </div>
    );

};

export default AdminLogin;
