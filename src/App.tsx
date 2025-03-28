import { useState } from "react";

function getUserId() {
  // Replace this with the actual logic to get the user ID
  return "12345";
}
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from './components/ProtectedRoute';
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Dashboard from "./pages/Dashboard";
import TodoList from "./components/TodoList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      {/* <HomePage />
      <RegistrationPage />
      <Route path="/register" element={<Register />} /> */}
        <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/todolist" element={<TodoList userId={localStorage.getItem('userId')} />} />
        {/* <Route
          path="/dashboard"
          element={
        <ProtectedRoute isAuthenticated={isLoggedIn}>
          <Dashboard />
        </ProtectedRoute>
          }
        /> */}
      </Routes>
    </>
  );
}

export default App;
