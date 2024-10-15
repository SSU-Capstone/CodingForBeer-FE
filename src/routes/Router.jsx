import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import EditView from '../components/EditView';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/editor" element={<EditView />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
