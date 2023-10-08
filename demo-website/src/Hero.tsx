import React from 'react';
import './Hero.css';

function Hero() {
    return (
        <header className="Hero">
            <div className="Hero-banner">
            <h1 className="Hero-banner-title">Samsung Store</h1>
            <button className="Hero-banner-btn">Shop now</button>  
            </div>
        </header>
    );
}

export default Hero;