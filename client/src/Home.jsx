import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './styles.css';

function Home() {
    const [userName, setUserName] = useState('');
    const location = useLocation();

    useEffect(() => {
        // Fetch user data only if the location changes (e.g., after login)
        if (location.pathname === '/home') {
            axios.get('http://localhost:3001/getUserName')
                .then(response => {
                    setUserName(response.data.name);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [location.pathname]);

    return (
        <div>
            <header className="title-bar">
                <a href="/" className="title">HOME</a>
                <div className="dropdown">
                    <button className="dropbtn">FITNESS</button>
                    <div className="dropdown-content">
                        <a href="/show-all-workouts">Show all workouts</a>
                        <a href="/new-workout-plan">New Workout Plan</a>
                    </div>
                </div>
            </header>

            <div className="main-content">
                <p>Welcome, {userName}</p>
            </div>
        </div>
    );
}

export default Home;
