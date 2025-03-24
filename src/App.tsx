import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/Registration";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      {/* <HomePage />
      <RegistrationPage />
      <Route path="/register" element={<Register />} /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
