import React from 'react';

import { Link } from 'react-router-dom';

import './Home.scss';

const Home = () => (
    <div className="Home">
        <h1>Home</h1>
        <Link className="btn start-btn" to="/main">Start</Link>
    </div>
);

export default Home;
