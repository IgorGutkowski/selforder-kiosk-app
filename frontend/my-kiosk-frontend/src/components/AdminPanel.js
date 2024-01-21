import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AdminContext } from '../context/AdminContext';
import CategoriesManager from './CategoriesManager';
import ProductsManager from "./ProductsManager";
import { CategoryChangeProvider } from '../context/CategoryChangeContext';

const AdminPanel = () => {
    const { state, dispatch } = useContext(AdminContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/admin');
    };

    if (!state.isAdminAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center py-8 px-4">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Odmowa dostępu</h1>
                <p className="mb-6">Nie masz uprawnień do wyświetlenia tej strony. Proszę
                    <button
                        onClick={() => navigate('/admin')}
                        className="text-blue-600 hover:text-blue-800 ml-1 focus:outline-none"
                    >
                        kliknij tutaj aby się zalogować.
                    </button>
                </p>
            </div>
        );
    }


    return (
        <CategoryChangeProvider>
            <div className="flex flex-col items-center justify-center min-h-screen  p-5">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Panel</h1>
                <div className="space-y-4">
                    <button onClick={handleLogout} className="bg-red-500  text-white font-bold uppercase text-lg px-6 py-2 rounded shadow hover:bg-red-600 transition ease-in-out duration-300">Wyloguj</button>
                    <button onClick={() => navigate('/statistics')} className="bg-blue-500 text-white  ml-5 font-bold uppercase text-lg px-6 py-2 rounded shadow hover:bg-blue-600 transition ease-in-out duration-300">Przejdź do statystyk</button>
                </div>
                <CategoriesManager />
                <ProductsManager />
            </div>
        </CategoryChangeProvider>
    );

};

export default AdminPanel;
