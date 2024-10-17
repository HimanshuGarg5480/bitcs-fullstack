import React, { useState } from "react";
import { loginUser } from "../api/authApi";

import { loginSchema } from "../validation/Authvalidation";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import './Login.css'; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const validationResult = loginSchema.validate({ email, password });
    if (validationResult.error) {
      setError(validationResult.error.details[0].message);
      return;
    }

    try {
      const response = await loginUser(email, password);
      const token = response.data.token;
      const role = response.data.user.role;
      localStorage.setItem("token", token);
      dispatch(setCredentials({ token, role }));
      console.log(response);
      navigate("/home");
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "Login failed";
      setError(errorMessage);
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleLogin} className="login-form"> 
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChangeEmail}
          className="login-input" 
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChangePassword}
          className="login-input" 
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default Login;
