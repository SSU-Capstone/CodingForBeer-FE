import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    navigate('/editor');
  }, []);
  return <h2>Dashboard</h2>;
};

export default Dashboard;
