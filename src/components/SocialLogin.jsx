import React, { useState } from "react";
import googleIcon from "../assets/google.png";
import githubIcon from "../assets/github.webp";
import xIcon from "../assets/x.png";
import facebookIcon from "../assets/facebook.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SocialLogin = () => {
  const navigate = useNavigate(); // Navigation hook to redirect to register page

  // State to store email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect to Spring Boot OAuth2 login endpoint
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const handleGitHubLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/github";
  };

  // Save token in cookies after login success
  const saveToken = (token) => {
    Cookies.set("token", token, {
      expires: 7, // 7 days
      secure: false, // Set true for HTTPS in production
      sameSite: "Lax",
      path: "/",
    });
  };

  // Handle form submission for email/password login
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        console.log("Token received:", token);
        saveToken(token);
        alert("Login successful!");
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Error during login:", error.response?.data || error.message);
      alert("Invalid credentials. Please try again.");
    }
  };

  // Redirect to register page
  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        {/* Email/Password Login Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Register Redirect Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Not registered?{" "}
            <span
              onClick={handleRegisterRedirect}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Register yourself
            </span>
          </p>
        </div>

        <div className="my-4 text-center text-gray-500">OR</div>

        {/* Social Login Icons */}
        <div className="flex items-center justify-center space-x-4">
          {/* Google Icon */}
          <img
            src={googleIcon}
            alt="Google Icon"
            className="w-8 h-8 rounded-full bg-white p-1 border border-gray-300 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
            onClick={handleGoogleLogin}
          />
          {/* GitHub Icon */}
          <img
            src={githubIcon}
            alt="GitHub Icon"
            className="w-8 h-8 rounded-full bg-white p-1 border border-gray-300 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
            onClick={handleGitHubLogin}
          />
          {/* X Icon */}
          <img
            src={xIcon}
            alt="X Icon"
            className="w-8 h-8 rounded-full bg-white p-1 border border-gray-300 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
            onClick={handleGoogleLogin}
          />
          {/* Facebook Icon */}
          <img
            src={facebookIcon}
            alt="Facebook Icon"
            className="w-8 h-8 rounded-full bg-white p-1 border border-gray-300 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
            onClick={handleGoogleLogin}
          />
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;
