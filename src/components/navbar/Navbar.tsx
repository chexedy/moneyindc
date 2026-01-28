import "./Navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="navbar">
            <div className="navbar-title">
                <img src="images/logo_square.png" alt="Site Logo" className="navbar-logo" />
                <h1>Money In DC</h1>
            </div>

            <div className="navbar-hamburger" onClick={() => setMenuOpen(prev => !prev)}>
                ☰
                <div className={`navbar-bar ${menuOpen ? "open" : ""}`}></div>
                <div className={`navbar-bar ${menuOpen ? "open" : ""}`}></div>
                <div className={`navbar-bar ${menuOpen ? "open" : ""}`}></div>
            </div>

            <div className={`navbar-buttons ${menuOpen ? "open" : ""}`}>
                <Link to="/" onClick={() => setMenuOpen(false)} className="navbar-buttons-link">Home</Link>
                <Link to="/search" onClick={() => setMenuOpen(false)} className="navbar-buttons-link">Search</Link>
                <Link to="/data" onClick={() => setMenuOpen(false)} className="navbar-buttons-link">Data</Link>
                {/* <Link to="/scores" onClick={() => setMenuOpen(false)} className="navbar-buttons-link">Scores</Link> */}
                <Link to="/about" onClick={() => setMenuOpen(false)} className="navbar-buttons-link">About</Link>
            </div>
        </div>
    )
}