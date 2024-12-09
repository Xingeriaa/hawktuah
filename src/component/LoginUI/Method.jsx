import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import '@fontsource/roboto/700.css';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Button from '@mui/material/Button';
import styles from './Method.module.css';

const firebaseConfig = {
    apiKey: "AIzaSyAJCdyl639uRYl6SZSfKb_tR_Tgyw2RV7Y",
    authDomain: "hawktuah-ea1ff.firebaseapp.com",
    projectId: "hawktuah-ea1ff",
    storageBucket: "hawktuah-ea1ff.firebasestorage.app",
    messagingSenderId: "532137125065",
    appId: "1:532137125065:web:8fe097f18bd591822a5918",
    measurementId: "G-C2L449F0SQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";

export default function Method() {
    const navigate = useNavigate(); 
    const [fadeIn, setFadeIn] = useState(true);

    const handleNavigate = (path) => {
        setFadeIn(false);
        setTimeout(() => navigate(path), 500);
    };

    onAuthStateChanged(auth, (user) => {
        if (user) {
            handleNavigate('/home');
        }
    });

    function RedirectHandler(method) {
        setFadeIn(false);
        setTimeout(() => {
            switch (method.toLowerCase()) {
                case "method":
                    navigate('/');
                    break;
                case "login":
                    navigate('/login'); 
                    break;
                case "register":
                    navigate('/register'); 
                    break;
                case "home":
                    navigate('/home');
                    break;
                default:
                    break;
            }
        }, 750); 
    }

    return (
        <div className={styles['method-home-container']}>
            <div className={`${styles['method-container']} ${fadeIn ? styles['fade-in'] : styles['fade-out']}`}>
                <div className={styles['image-container']}>
                    <img src="src/assets/Login/login-image.jpg" alt="" />
                </div>
                <div className={styles['buttons-container']}>
                    <Button 
                        variant="contained" 
                        className={styles['btn-login']} 
                        onClick={() => RedirectHandler('login')}
                    >
                        Login
                    </Button>
                    <Button 
                        variant="outlined" 
                        className={styles['btn-register']} 
                        onClick={() => RedirectHandler('register')}
                    >
                        Register
                    </Button>
                </div>
            </div>
        </div>
    );
}
