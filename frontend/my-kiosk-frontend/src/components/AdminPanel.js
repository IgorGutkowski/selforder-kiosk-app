// src/components/AdminPanel.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AdminContext } from '../context/AdminContext';
import CategoriesManager from './CategoriesManager';
import ProductsManager from "./ProductsManager";

const AdminPanel = () => {
    const { state, dispatch } = useContext(AdminContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/admin');
    };

    if (!state.isAdminAuthenticated) {

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
            <button onClick={() => navigate('/statistics')}>Show Statistics</button>
            <CategoriesManager />
            <ProductsManager />
        </div>
    );
};

export default AdminPanel;
