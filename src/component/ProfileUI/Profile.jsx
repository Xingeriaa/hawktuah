import './Profile.css';

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SettingsIcon from '@mui/icons-material/Settings';

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

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
const db = getFirestore(app);
auth.languageCode = "en";

export default function Profile() {
    const navigate = useNavigate();
    const [userPhotoURL, setUserPhotoURL] = useState('src/assets/DefaultProfilePic/Default.jpg');
    const [displayName, setDisplayName] = useState('Guest');
    const [followersCount, setFollowersCount] = useState(0);

    useEffect(() => {
        document.body.style.background = 'black';
        return () => {
            document.body.style.background = '';
        };
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDocRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userDocRef);
                if (userSnap.exists()) {
                    const data = userSnap.data();
                    setUserPhotoURL(data.photoURL || 'src/assets/DefaultProfilePic/Default.jpg');
                    setDisplayName(data.displayName || 'Guest');
                    setFollowersCount(data.followersCount || 0);
                } else {
                    // Fallback if no Firestore doc
                    setUserPhotoURL(user.photoURL || 'src/assets/DefaultProfilePic/Default.jpg');
                    setDisplayName(user.displayName || 'Guest');
                }
            } else {
                navigate('/');  
                console.log('User is not logged in');
            }
        });

        return () => unsubscribe();
    }, [navigate, db]);

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <>
            <div className="page-wrapper">
                {/* Sidebar: only visible on desktop */}
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

                    <SettingsIcon className="icon settings-icon" onClick={() => handleNavigate('/setting')} />

                    <div className="profile sidebar-profile" onClick={() => handleNavigate('/profile')}>
                        <img src={userPhotoURL} alt="Profile" className="profileImage" />
                    </div>
                </div>

                <div className="profile-content-container">
                    <div className="profile-header">
                        <img src={userPhotoURL} alt="Profile" className="profile-avatar" />
                        <h2 className="profile-displayname">{displayName}</h2>
                        <p className="profile-followers">{followersCount} followers</p>
                        <button className="edit-profile-btn">Edit Profile</button>
                    </div>

                    <div className="profile-tabs">
                        <button className="tab-button active">Threads</button>
                        <button className="tab-button">Replies</button>
                        <button className="tab-button">Reposts</button>
                    </div>

                    <div className="post-box">
                        <input type="text" className="post-input" placeholder="What's new?" />
                        <button className="post-button">Post</button>
                    </div>

                    <div className="finish-profile-section">
                        <p className="finish-profile-title">Finish your profile</p>
                        <p className="finish-profile-remaining">4 left</p>
                        <div className="finish-profile-cards">
                            <div className="finish-profile-card">
                                <p className="card-icon">📷</p>
                                <p className="card-title">Add profile photo</p>
                                <p className="card-desc">Make it easier for people to recognize you.</p>
                                <button className="card-action">Add</button>
                            </div>
                            <div className="finish-profile-card">
                                <p className="card-icon">📝</p>
                                <p className="card-title">Create thread</p>
                                <p className="card-desc">Share what's on your mind or a recent highlight.</p>
                                <button className="card-action">Create</button>
                            </div>
                            <div className="finish-profile-card">
                                <p className="card-icon">👤</p>
                                <p className="card-title">Follow 5 profiles</p>
                                <p className="card-desc">Fill your feed with threads that interest you.</p>
                                <button className="card-action">See profiles</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Nav for mobile */}
            <div className="bottom-nav-container">
                <HomeIcon className="icon" onClick={() => handleNavigate('/home')} />
                <SearchIcon className="icon" onClick={() => handleNavigate('/search')} />
                <AddBoxOutlinedIcon className="icon" onClick={() => handleNavigate('/create')} />
                <MovieFilterOutlinedIcon className="icon" onClick={() => handleNavigate('/movies')} />
                <div className="profile bottom-profile" onClick={() => handleNavigate('/profile')}>
                    <img src={userPhotoURL} alt="Profile" className="profileImage" />
                </div>
            </div>
        </>
    );
}
