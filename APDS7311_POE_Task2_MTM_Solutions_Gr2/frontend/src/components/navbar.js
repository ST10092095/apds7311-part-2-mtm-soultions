import React from "react";
import { NavLink } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
    return (
        <header className="nav_header">
            <nav className="navbar">
                
                        <NavLink to="/">Home</NavLink>
                    
                        <NavLink to="/register">Register</NavLink>
                    
                        <NavLink to="/login">Login</NavLink>
                    
                        <NavLink to="/payment">Payments</NavLink>
                      
            </nav>
        </header>
        
    )
}

export default Navbar