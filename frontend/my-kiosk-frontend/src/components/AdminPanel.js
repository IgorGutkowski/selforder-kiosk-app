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
        <div>
            <h1>Admin Dashboard</h1>
            <CategoriesManager />
            <ProductsManager />
        </div>
    );
};

export default AdminPanel;
