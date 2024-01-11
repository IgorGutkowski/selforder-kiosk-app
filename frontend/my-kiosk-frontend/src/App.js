import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import OrderTypeSelection from './components/OrderTypeSelection';
import Menu from './components/Menu'
import PaymentScreen from './components/PaymentScreen';
import OrderConfirmationScreen from './components/OrderConfirmationScreen';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="App app">
                <Routes>
                    <Route path="/" element={<WelcomeScreen />} />
                    <Route path="/order-type" element={<OrderTypeSelection />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/payment" element={<PaymentScreen />} />
                    <Route path="/order-confirmation" element={<OrderConfirmationScreen />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
