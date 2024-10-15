import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  navigate('/editor');
  return <h2>Dashboard</h2>;
};

export default Dashboard;
