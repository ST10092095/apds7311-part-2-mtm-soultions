import React from "react";
import { NavLink, useNavigate  } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <header className="nav_header">
            <nav className="navbar">
                
                        <NavLink to="/">Home</NavLink>
                    
                        <NavLink to="/register">Register</NavLink>
                    
                        <NavLink to="/login">Login</NavLink>
                    
                        <NavLink to="/payment">Payments</NavLink>

                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                      
            </nav>
        </header>
        
    )
}

export default Navbar