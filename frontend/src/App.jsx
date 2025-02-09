import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LogInPage from "./pages/LogInPage.jsx"; // Corrected import statement
import ProfilePage from "./pages/ProfilePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import NavBar from "./components/NavBar.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import { useThemeStore } from "./store/useThemeStore.js";
import { useEffect } from "react";
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({onlineUsers}); 
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if( isCheckingAuth && !authUser ){
    return (
      <div className="flex items-center justify-center h-screen">
      <Loader className='size-10 animate-spin'/>
      </div>
    );
  }

  console.log({authUser});
  return <div data-theme={theme}>
      <NavBar />
      <Routes>
        <Route path="/" element={ authUser? <HomePage /> : <Navigate to='/login' />}/>
        <Route path="/login" element={ !authUser? <LogInPage /> : <Navigate to='/'/>}/>
        <Route path="/signup" element={ !authUser? <SignUpPage /> : <Navigate to='/'/>}/>
        <Route path="/settings" element={<SettingsPage />}/>
        <Route path="/profile" element={ authUser? <ProfilePage /> : <Navigate to='/login'/>}/>
      </Routes>

      <Toaster />
  </div>;
};

export default App;
