import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [fullName, setFullName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post("/api/auth/register", {
        fullName,
        idNumber,
        accountNumber,
        username,
        password,
      });
      if (response.status === 201) {
        navigate('/');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Register</div>
        <div className="underline"></div>
      </div>
        <div className="inputs">
        <form onSubmit={handleSubmit}>
        <label htmlFor="fullName">Full Name</label>
          <div className="input">
            <input
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            autoComplete="on"
            placeholder="Full Name"
            />
          </div>

          <label htmlFor="idNumber">Id Number</label>
          <div className="input">
            <input
            type="text"
            id="idNumber"
            name="idNumber"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            autoComplete="on"
            placeholder="ID Number"
           />
          </div>



          <label htmlFor="accountNumber">Account Number</label>
          <div className="input">
            <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            autoComplete="on"
            placeholder="Account Number"
            />
          </div>

          <label htmlFor="username">Username</label>
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


          <label htmlFor="password">Password</label>
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

        {error && <div>{error}</div>}

        <div className="submit-container">
              <button className="submit">
                Register
              </button>
            </div>
      </form>
        </div>
    </div>
  );
}

export default Register;
