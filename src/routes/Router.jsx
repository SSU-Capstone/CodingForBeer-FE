import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Editor from '../pages/Editor';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/editor" element={<Editor />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
