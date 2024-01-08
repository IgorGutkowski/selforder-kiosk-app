import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import OrderTypeSelection from './components/OrderTypeSelection';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<WelcomeScreen />} />
                    <Route path="/order-type" element={<OrderTypeSelection />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
