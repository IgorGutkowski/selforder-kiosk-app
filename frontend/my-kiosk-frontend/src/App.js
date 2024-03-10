import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import OrderTypeSelection from './components/OrderTypeSelection';
import Menu from './components/Menu'
import PaymentScreen from './components/PaymentScreen';
import OrderConfirmationScreen from './components/OrderConfirmationScreen';
import { AdminProvider } from './context/AdminContext';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import Statistics from './components/Statistics';

import './App.css';

const App = () => {
    return (
        <AdminProvider>
            <Router>
                <div className="flex justify-center items-center min-h-screen bg-gray-50">
                    <div className="w-full max-w-screen-lg p-4 bg-white shadow-xl overflow-auto" style={{ height: '800px' }}>
                        <Routes>
                            <Route path="/" element={<WelcomeScreen />} />
                            <Route path="/order-type" element={<OrderTypeSelection />} />
                            <Route path="/menu" element={<Menu />} />
                            <Route path="/payment" element={<PaymentScreen />} />
                            <Route path="/order-confirmation" element={<OrderConfirmationScreen />} />
                            <Route path="/admin" element={<AdminLogin />} />
                            <Route path="/admin-panel" element={<AdminPanel />} />
                            <Route path="/statistics" element={<Statistics />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </AdminProvider>
    );


};

export default App;
