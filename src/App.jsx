import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './component/LoginUI/Login.jsx'
import Register from "./component/LoginUI/Register.jsx";
import Method from "./component/LoginUI/Method.jsx"
import Home from "./component/HomeUI/Home.jsx"
import Profile from "./component/ProfileUI/Profile.jsx";
import Setting from "./component/SettingUI/Setting.jsx";


import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function App() {

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
  auth.languageCode = "it";



  return (
    <>
      <Routes>
        <Route path="/" element={<Method />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </>
  )
}

export default App
