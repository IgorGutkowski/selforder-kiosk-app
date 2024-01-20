// src/components/AdminPanel.js
import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import CategoriesManager from './CategoriesManager';
import ProductsManager  from "./ProductsManager";

const AdminPanel = () => {
    const { state } = useContext(AdminContext);

    if (!state.isAdminAuthenticated) {
        return <p>Access Denied</p>;
    }

    return (
        <div className="admin-panel">
            <h1 className="admin-title">Admin Panel</h1>
            <CategoriesManager />
            <ProductsManager />
        </div>

    );
};

export default AdminPanel;
