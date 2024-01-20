// src/context/AdminContext.js
import React, { createContext, useReducer } from 'react';

const initialState = {
    isAdminAuthenticated: false,
    adminData: null,
};

const adminReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAdminAuthenticated: true,
                adminData: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAdminAuthenticated: false,
                adminData: null,
            };
        default:
            return state;
    }
};

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [state, dispatch] = useReducer(adminReducer, initialState);

    return (
        <AdminContext.Provider value={{ state, dispatch }}>
            {children}
        </AdminContext.Provider>
    );
};
