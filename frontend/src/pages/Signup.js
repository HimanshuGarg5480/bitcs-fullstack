import React, { useState } from "react";
import { signupUser } from "../api/authApi";
import { signupSchema } from "../validation/Authvalidation";
import './Signup.css'; // Importing the CSS file

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Added state for error handling

  const handleSignup = async (e) => {
    e.preventDefault();
    const validationResult = signupSchema.validate({ email, password });
    if (validationResult.error) {
      return;
    }

    try {
      await signupUser(email, password);
      // Reset error message on successful signup
      setError("");
      window.location.href = "/login";
    } catch (error) {
      setError("Signup failed: " + error.message); // Set error message
    }
  };

  return (
    <div className="signup-container"> {/* Added class for styling */}
      <h2 className="signup-title">Signup</h2> {/* Added class for styling */}
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      <form onSubmit={handleSignup} className="signup-form"> {/* Added class for styling */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signup-input" 
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signup-input" 
        />
        <button type="submit" className="signup-button">Signup</button> {/* Added class for styling */}
      </form>
    </div>
  );
};

export default Signup;
