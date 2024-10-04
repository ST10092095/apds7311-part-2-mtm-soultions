import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // try{
        //     const response = await fetch('/api/auth/login', {
        //         method: 'POST',
        //         headers: {'Content-Type': 'application/json'},
        //         body: JSON.stringify({username, password})
        //     });
        //     const data = await response.json();

        //     if (data.error) {
        //         setError(data.error);
        //     } else {
        //         localStorage.setItem('token', data.token);
        //         window.location.href = '/protected';
        //     }
        // } catch (error) {
        //     if (error.response) {
        //         setError(error.response.data.message);
        //     } else {
        //         setError("Something went wrong. Please try again");
        //     }
        // }
        // axios function
        try {
            const response = await axios.post('/api/auth/login', {username, password});
            localStorage.setItem('token', response.data.token);
            navigate('/protected');
        } catch (error) {
            if (error.response) {
                        setError(error.response.data.message);
                    } else {
                        setError("Something went wrong. Please try again");
                    }
        }
    }
    return (
        <>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name='username' value={username} onChange={(e) => setUsername(e.target.value)} autoComplete='true'/>

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            {error && <p style={{color: 'red'}}>{error}</p>}

            <button type="submit">Login</button>
        </form>
        </>
    );
}

export default Login