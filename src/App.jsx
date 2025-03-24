import React from "react";
import { Routes, Route } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";
import Register from "./components/Register"; // Create this component if needed

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SocialLogin />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
