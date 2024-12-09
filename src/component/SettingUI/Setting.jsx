import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
  ArrowBackIosNew as ArrowBackIosNewIcon,
  Lock as LockIcon,
  AlternateEmail as AlternateEmailIcon,
  WifiTethering as WifiTetheringIcon,
  VisibilityOff as VisibilityOffIcon,
  Block as BlockIcon,
  RemoveRedEye as RemoveRedEyeIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  Launch as LaunchIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  AddBoxOutlined as AddBoxOutlinedIcon,
  MovieFilterOutlined as MovieFilterOutlinedIcon,
  ChatBubbleOutlineOutlined as ChatBubbleOutlineOutlinedIcon,
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

import { Typography, Switch } from '@mui/material';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import './Setting.css';

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
const db = getFirestore(app);

export default function Setting() {
    const [userPhotoURL, setUserPhotoURL] = useState('src/assets/DefaultProfilePic/Default.jpg');
    const [privateProfile, setPrivateProfile] = useState(false);
    const [activeTab, setActiveTab] = useState('Privacy'); 
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {}
    };

    useEffect(() => {
        document.body.style.background = 'black';
        return () => {
            document.body.style.background = '';
        };
    }, []);

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

    const renderPrivacy = () => (
        <>
            <div className="setting-section">
                <div className="setting-row">
                    <LockIcon className="setting-row-icon" />
                    <span className="setting-row-text">Private profile</span>
                    <Switch
                        checked={privateProfile}
                        onChange={(e) => setPrivateProfile(e.target.checked)}
                        className="toggle-switch"
                    />
                </div>

                <div className="setting-row">
                    <AlternateEmailIcon className="setting-row-icon" />
                    <span className="setting-row-text">Mentions</span>
                    <span className="setting-row-right">Everyone</span>
                </div>

                <div className="setting-row">
                    <WifiTetheringIcon className="setting-row-icon" />
                    <span className="setting-row-text">Online status</span>
                    <span className="setting-row-right">Followers</span>
                </div>

                <div className="setting-row">
                    <VisibilityOffIcon className="setting-row-icon" />
                    <span className="setting-row-text">Hidden Words</span>
                    <ArrowForwardIosIcon className="setting-row-arrow" />
                </div>
            </div>

            <div className="other-settings-section">
                <Typography variant="body1" className="other-settings-title">Other privacy settings</Typography>

                <div className="setting-row">
                    <BlockIcon className="setting-row-icon" />
                    <span className="setting-row-text">Blocked profiles</span>
                    <LaunchIcon className="setting-row-arrow" />
                </div>

                <div className="setting-row">
                    <RemoveRedEyeIcon className="setting-row-icon" />
                    <span className="setting-row-text">Hide like and share counts</span>
                    <LaunchIcon className="setting-row-arrow" />
                </div>
            </div>
        </>
    );

    const renderAccount = () => (
        <>
            <div className="setting-section">
                <div className="setting-row">
                    <span className="setting-row-text">Website permissions</span>
                    <ArrowForwardIosIcon className="setting-row-arrow" />
                </div>
    
                <div className="setting-row">
                    <span className="setting-row-text">Deactivate or delete profile</span>
                    <ArrowForwardIosIcon className="setting-row-arrow" />
                </div>
    
                <div className="setting-row">
                    <span className="setting-row-text">Fediverse sharing</span>
                    <span className="beta-badge">BETA</span>
                    <span className="setting-row-right">Off</span>
                </div>
            </div>
    
            <div className="other-settings-section">
                <Typography variant="body1" className="other-settings-title">Other account settings</Typography>
                <Typography variant="body2" className="other-settings-desc">
                    Some settings, like username and password, apply to both Threads and Instagram and can be managed on Instagram.
                </Typography>
    
                <div className="setting-row">
                    <span className="setting-row-text">Personal information</span>
                    <LaunchIcon className="setting-row-arrow" />
                </div>
    
                <div className="setting-row">
                    <span className="setting-row-text">Supervision</span>
                    <LaunchIcon className="setting-row-arrow" />
                </div>
    
                <div className="setting-row">
                    <span className="setting-row-text">Security</span>
                    <LaunchIcon className="setting-row-arrow" />
                </div>
    
                <div className="setting-row">
                    <span className="setting-row-text">Account status</span>
                    <LaunchIcon className="setting-row-arrow" />
                </div>
    
                <div className="setting-row">
                    <span className="setting-row-text">Download your information</span>
                    <LaunchIcon className="setting-row-arrow" />
                </div>
    
                <div className="setting-row">
                    <span className="setting-row-text">Transfer your information</span>
                    <LaunchIcon className="setting-row-arrow" />
                </div>
    
                {/* Add the logout button */}
                <div className="logout-button-container">
                    <button className="logout-button" onClick={handleSignOut}>
                        Log Out
                    </button>
                </div>
            </div>
        </>
    );

    const renderHelp = () => (
        <>
            <div className="setting-section">
                <div className="setting-row">
                    <span className="setting-row-text">Privacy and security help</span>
                    <ArrowForwardIosIcon className="setting-row-arrow" />
                </div>

                <div className="setting-row">
                    <span className="setting-row-text">Support requests</span>
                    <ArrowForwardIosIcon className="setting-row-arrow" />
                </div>
            </div>

            <div className="other-settings-section">
                <Typography variant="body1" className="other-settings-title"></Typography>
                <Typography variant="body2" className="other-settings-desc">
                    Some information and policies:
                </Typography>

                <div className="setting-row">
                    <span className="setting-row-text">Help Center</span>
                    <LaunchIcon className="setting-row-arrow" />
                </div>

                <div className="setting-row">
                    <span className="setting-row-text">Meta Privacy Policy</span>
                    <LaunchIcon className="setting-row-arrow" />
                </div>

                <div className="setting-row">
                    <span className="setting-row-text">Meta Terms of Use</span>
                    <LaunchIcon className="setting-row-arrow" />
                </div>

                <div className="setting-row">
                    <span className="setting-row-text">Threads Supplemental Privacy Policy</span>
                    <LaunchIcon className="setting-row-arrow" />
                </div>

                <div className="setting-row">
                    <span className="setting-row-text">Threads Terms of Use</span>
                    <LaunchIcon className="setting-row-arrow" />
                </div>

                <div className="setting-row">
                    <span className="setting-row-text">Cookies Policy</span>
                    <LaunchIcon className="setting-row-arrow" />
                </div>

                <div className="setting-row">
                    <span className="setting-row-text">Fediverse Guide</span>
                    <LaunchIcon className="setting-row-arrow" />
                </div>
            </div>
        </>
    );

    return (
        <>
            <div className="page-wrapper">
                <div className="sidebar">
                    <img
                        src="src/assets/logo-square.png"
                        alt="Logo"
                        className="sidebarLogo"
                        onClick={() => handleNavigate('/home')}
                    />

                    <div className="all-icons">
                        <HomeIcon className="icon" onClick={() => handleNavigate('/home')} />
                        <SearchIcon className="icon" onClick={() => handleNavigate('/search')} />
                        <AddBoxOutlinedIcon className="icon" onClick={() => handleNavigate('/create')} />
                        <MovieFilterOutlinedIcon className="icon" onClick={() => handleNavigate('/movies')} />
                        <FavoriteBorderOutlinedIcon className="icon" onClick={() => handleNavigate('/favorites')} />
                        <ChatBubbleOutlineOutlinedIcon className="icon" onClick={() => handleNavigate('/chat')} />
                    </div>

                    <div className="settings-icon-container">
                        <SettingsIcon className="icon" onClick={() => handleNavigate('/setting')} />
                    </div>

                    <div className="profile sidebar-profile" onClick={() => handleNavigate('/profile')}>
                        <img src={userPhotoURL} alt="Profile" className="profileImage" />
                    </div>
                </div>

                <div className="content-area">
                    <div className="top-nav">
                        <ArrowBackIosNewIcon className="back-icon" onClick={() => handleNavigate('/profile')} />
                        <Typography variant="h6" className="settings-title">Settings</Typography>
                    </div>

                    <div className="settings-card">
                        <div className="tabs">
                            <button
                                className={`tab ${activeTab === 'Privacy' ? 'active' : ''}`}
                                onClick={() => setActiveTab('Privacy')}
                            >
                                Privacy
                            </button>
                            <button
                                className={`tab ${activeTab === 'Account' ? 'active' : ''}`}
                                onClick={() => setActiveTab('Account')}
                            >
                                Account
                            </button>
                            <button
                                className={`tab ${activeTab === 'Help' ? 'active' : ''}`}
                                onClick={() => setActiveTab('Help')}
                            >
                                Help
                            </button>
                        </div>

                        {activeTab === 'Privacy' && renderPrivacy()}
                        {activeTab === 'Account' && renderAccount()}
                        {activeTab === 'Help' && renderHelp()}
                    </div>
                </div>
            </div>

            <div className="bottom-nav-container">
                <HomeIcon className="icon" onClick={() => handleNavigate('/home')} />
                <SearchIcon className="icon" onClick={() => handleNavigate('/search')} />
                <AddBoxOutlinedIcon className="icon" onClick={() => handleNavigate('/create')} />
                <MovieFilterOutlinedIcon className="icon" onClick={() => handleNavigate('/movies')} />
                <div className="profile bottom-profile" onClick={() => handleNavigate('/profile')}>
                    <img
                        src={userPhotoURL}
                        alt="Profile"
                        className="profileImage"
                    />
                </div>
            </div>
        </>
    );
}
