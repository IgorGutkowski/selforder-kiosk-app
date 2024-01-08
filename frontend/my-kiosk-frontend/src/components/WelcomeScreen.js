import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdvertisementCarousel from './AdvertisementCarousel';
const WelcomeScreen = () => {
    const navigate = useNavigate();

    const handleStartOrderClick = () => {
        navigate('/order-type');
    };

    return (
        <div className="welcome-container">
            <h1 className="welcome-message">Witaj w Naszej Restauracji!</h1>
            <AdvertisementCarousel />
            <button className="start-order-button" onClick={handleStartOrderClick}>
                Rozpocznij składanie zamówienia
            </button>
        </div>
    );
};

export default WelcomeScreen;
