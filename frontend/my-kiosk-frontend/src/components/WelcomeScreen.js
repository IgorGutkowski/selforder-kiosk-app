import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdvertisementCarousel from './AdvertisementCarousel';
import '../App.css';
const WelcomeScreen = () => {
    const navigate = useNavigate();

    const handleStartOrderClick = () => {
        navigate('/order-type');
    };

    const handleAdminClick = () => {
        navigate('/admin');
    };

    return (
        <div className="flex flex-col items-center justify-center p-5 overflow-hidden relative">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Witaj w Naszej Restauracji!</h1>
            <AdvertisementCarousel />
            <button
                className="mt-8 bg-yellow-500 text-white font-bold uppercase text-lg px-10 py-4 rounded shadow transition ease-in-out duration-300 hover:scale-105 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleStartOrderClick}>
                Rozpocznij składanie zamówienia
            </button>

            {/* Discreet Admin Button */}
            <button
                onClick={handleAdminClick}
                className="absolute bottom-2 left-2 text-xs text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Admin Login">
                Admin
            </button>
        </div>
    );




};

export default WelcomeScreen;
