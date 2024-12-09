import './Register.css';
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, TextField, Divider } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword ,signInWithPopup, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from 'uuid';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

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

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export default function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fadeIn, setFadeIn] = useState(true);

    useEffect(() => {
        setFadeIn(true);
    }, []);

    const handleNavigate = (path) => {
        setFadeIn(false);
        setTimeout(() => {
            navigate(path);
        }, 500);
    };

    const emailCreate = () => {
        if (!email || !password) {
            alert("Email and password are required.");
            return;
        } 
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                userCredential.user.updateProfile({
                    displayName: `User-${uuidv4().slice(0, 6)}`
                }).then(() => {}, () => {});
                handleNavigate('/home');
            })
            .catch(error => alert(`Error: ${error.message}`));
    };

    const socialLogin = (provider) => {
        signInWithPopup(auth, provider)
            .then(() => handleNavigate('/home'))
            .catch(error => alert(`Error: ${error.message}`));
    };

    return (
        <div className={`login-container ${fadeIn ? 'fade-in' : 'fade-out'}`}>
            <Box className="center-box">
                <div className="title-content">
                    <Button
                        className="btn-back"
                        variant="outlined"
                        onClick={() => handleNavigate('/')}
                    >
                        <ArrowBackIosNewIcon />
                    </Button>
                    <Typography variant="h4" sx={{ mt: 2 }}>
                        Hello! Register to get started!
                    </Typography>
                </div>
            </Box>

            <Box className="center-box">
                <div className="box-content">
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        sx={{ mt: 2 }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        label="Confirm Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        sx={{ mt: 2 }}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        sx={{ width: "100%", mt: 2 }}
                        onClick={emailCreate}
                    >
                        Register
                    </Button>
                </div>
            </Box>

            <Box className="center-box">
                <Divider sx={{ flexGrow: 1, height: 1, backgroundColor: "#ccc" }} />
                <Typography variant="body2" sx={{ mx: 2, color: "#888" }}>
                    Or Register with
                </Typography>
                <Divider sx={{ flexGrow: 1, height: 1, backgroundColor: "#ccc" }} />
            </Box>

            <Box className="center-box">
                <div className="button-group">
                    <Button variant="outlined" onClick={() => socialLogin(facebookProvider)}>
                        <FacebookRoundedIcon />
                    </Button>
                    <Button variant="outlined" onClick={() => socialLogin(googleProvider)}>
                        <GitHubIcon />
                    </Button>
                    <Button variant="outlined" onClick={() => socialLogin(githubProvider)}>
                        <GoogleIcon />
                    </Button>
                </div>
            </Box>

            <Box className="center-box">
                <Typography variant="body2">
                    Already have an account? <a href="#" onClick={() => handleNavigate('/login')}>Login now</a>
                </Typography>
            </Box>
        </div>
    );
}
