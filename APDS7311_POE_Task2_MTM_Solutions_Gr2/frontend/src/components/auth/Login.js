import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './auth.css';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isEmployee, setIsEmployee] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);

      if(isEmployee) {
        const response = await axios.post("/api/authEmployee/login", {
          username,
          password,
        });

        localStorage.setItem("token", response.data.token);

        //navigate("/employee");
      }
      else{

        const response = await axios.post("/api/auth/login", {
          username,
          password,
        });

        localStorage.setItem("token", response.data.token);

        navigate("/payment");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    }
  };
  return (
    <>

      <div className="container">
          <div className="header">
            <div className="text">Login</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <div className="input">
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="on"
                placeholder="Username"
              />
            </div>
            <label htmlFor="password">Password:</label>
            <div className="input">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}
            
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="employeeCheckbox"
                name="employeeCheckbox"
                checked={isEmployee}
                onChange={() => setIsEmployee(!isEmployee)}
              />
              <label htmlFor="employeeCheckbox">Login as Employee</label>
            </div>
            
            <div className="submit-container">
              <button className="submit">
                Login
              </button>
            </div>
          </form>
          </div>

      </div>

    </>
  );
}

export default Login;
