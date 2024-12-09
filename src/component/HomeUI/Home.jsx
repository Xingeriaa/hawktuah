import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SettingsAppIcon from '@mui/icons-material/Settings'; // for sidebar settings icon

import './Home.css';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAJCdyl639uRYl6SZSfKb_tR_Tgyw2RV7Y",
    authDomain: "hawktuah-ea1ff.firebaseapp.com",
    projectId: "hawktuah-ea1ff",
    storageBucket: "hawktuah-ea1ff.firebasestorage.app",
    messagingSenderId: "532137125065",
    appId: "1:532137125065:web:8fe097f18bd591822a5918",
    measurementId: "G-C2L449F0SQ"
};

let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

const auth = getAuth(app);
auth.languageCode = "en";

export default function Home() {
    const [userPhotoURL, setUserPhotoURL] = useState('src/assets/DefaultProfilePic/Default.jpg');
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('home-background');
        return () => {
            document.body.classList.remove('home-background');
        };
    }, []);

    const handleNavigate = (path) => {
        navigate(path);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserPhotoURL(user.photoURL || 'src/assets/DefaultProfilePic/Default.jpg');  
            } else {
                navigate('/');  
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    return (
        <>
            {/* Removed top nav entirely. */}
            
            {/* Bottom Nav for mobile */}
            <div className="bottom-nav-container">
                <HomeIcon className="icon" onClick={() => handleNavigate('/home')} />
                <SearchIcon className="icon" onClick={() => handleNavigate('/search')} />
                <AddBoxOutlinedIcon className="icon" onClick={() => handleNavigate('/create')} />
                <MovieFilterOutlinedIcon className="icon" onClick={() => handleNavigate('/movies')} />
                <div className="profile" onClick={() => handleNavigate('/profile')}>
                    <img src={userPhotoURL} alt="Profile" className="profileImage" />
                </div>
            </div>

            {/* Sidebar for desktop */}
            <div className="sidebar">
                <img 
                    src="src/assets/logo-square.png" 
                    alt="Logo" 
                    className="sidebarLogo"
                    onClick={() => handleNavigate('/home')}
                />

                <div className="icon-container">
                    <HomeIcon className="icon" onClick={() => handleNavigate('/home')} />
                    <SearchIcon className="icon" onClick={() => handleNavigate('/search')} />
                    <AddBoxOutlinedIcon className="icon" onClick={() => handleNavigate('/create')} />
                    <MovieFilterOutlinedIcon className="icon" onClick={() => handleNavigate('/movies')} />
                    <FavoriteBorderOutlinedIcon className="icon" onClick={() => handleNavigate('/favorites')} />
                    <ChatBubbleOutlineOutlinedIcon className="icon" onClick={() => handleNavigate('/chat')} />
                </div>

                <SettingsAppIcon className="icon settings-icon" onClick={() => handleNavigate('/setting')} />

                <div className="profile" onClick={() => handleNavigate('/profile')}>
                    <img src={userPhotoURL} alt="Profile" className="profileImage" />
                </div>
            </div>
        </>
    );
}
