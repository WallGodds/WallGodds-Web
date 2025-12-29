import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <h2 className={styles.logo}>WallGodds</h2>
                    <p>Elevating your screens with high-quality wallpapers.</p>
                </div>
                <div className={styles.links}>
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/gallery">Gallery</Link></li>
                        <li><Link to="/aboutus">About Us</Link></li>
                        <li><Link to="/upload">Upload</Link></li>
                    </ul>
                </div>
                <div className={styles.social}>
                    <h3>Connect</h3>
                    <div className={styles.icons}>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <p>&copy; {new Date().getFullYear()} WallGodds. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
