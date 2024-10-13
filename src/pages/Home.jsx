import React from 'react';
import GoogleLogin from '../components/GoogleLogin';
import SocialKakao from '../components/SocialKakao';
import EditView from '../components/EditView';

const Home = () => {
  return (
    <header className="App-header">
        <SocialKakao />
        <GoogleLogin />
        <EditView />
    </header>
  );
};

export default Home;