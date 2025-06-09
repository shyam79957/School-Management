// src/pages/Home.jsx
import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import schoolBanner from '../assets/back_to_school_facebook_cover_34.jpg'; // Your banner image
import schoolLogo from '../assets/school-logo.png';     // Your school logo

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="school-name">GVMC High School</div>
        <button className="login-button" onClick={() => navigate('/login')}>
          Login
        </button>
      </nav>

      <header className="home-header">
        <img src={schoolLogo} alt="School Logo" className="logo" />
        <h1>Welcome to GVMC High School</h1>
        <p className="subtitle">Empowering students for a brighter tomorrow</p>
      </header>

      <main className="home-main">
        <img src={schoolBanner} alt="School Banner" className="banner" />
        <div className="info">
          <h2>About Our School</h2>
          <p>
            GVMC High School is committed to providing a nurturing and inspiring environment
            for all students. We believe in academic excellence, character development,
            and preparing students to become responsible global citizens.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
