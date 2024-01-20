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
                dispatch({ type: 'LOGIN_SUCCESS', payload: adminData });
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

    return (
        <div className="form-container admin-login">
            <h1 className="admin-title">Admin Login</h1>
            <Formik
                initialValues={{ adminKey: '' }}
                onSubmit={handleAdminLogin}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form-field">
                            <Field type="password" name="adminKey" placeholder="Enter Admin Key" className="form-input" />
                        </div>
                        <div className="form-field">
                            <button type="submit" disabled={isSubmitting} className="edit">
                                Login
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AdminLogin;
