// src/components/AdminPanel.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AdminContext } from '../context/AdminContext';
import CategoriesManager from './CategoriesManager';
import ProductsManager from "./ProductsManager";

const AdminPanel = () => {
    const { state, dispatch } = useContext(AdminContext);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/admin'); // Redirect to the login page
    };

    if (!state.isAdminAuthenticated) {
        // If not authenticated, redirect to the login page with a message
        return (
            <div>
                <p>Access Denied. You are not authorized to view this page.</p>
                <p>Please <button onClick={() => navigate('/admin')}>click here</button> to login.</p>
            </div>
        );
    }

    return (
        <div className="admin-panel">
            <h1 className="admin-title">Admin Panel</h1>
            <button onClick={handleLogout} className="delete">Logout</button>
            <CategoriesManager />
            <ProductsManager />
        </div>
    );
};

export default AdminPanel;
