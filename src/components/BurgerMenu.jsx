// src/components/BurgerMenu.jsx
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function BurgerMenu() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(prev => !prev);
    const closeMenu = () => setMenuOpen(false);

    const isActive = (path) => location.pathname === path ? "active" : "";

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <Link className="navbar-brand" to="/">Marianne Eberhardt - En Støttende Hånd</Link>
            <button
                className="navbar-toggler"
                type="button"
                onClick={toggleMenu}
                aria-controls="navbarNav"
                aria-expanded={menuOpen}
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link to="/" onClick={closeMenu} className={`nav-link ${isActive("/")}`}>Velkommen</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/ayurvedisk-profil" onClick={closeMenu} className={`nav-link ${isActive("/ayurvedisk-profil")}`}>Ayurvedisk Profil</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/sygedagpenge" onClick={closeMenu} className={`nav-link ${isActive("/sygedagpengesag")}`}>Sygedagpengesag</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/om-marianne" onClick={closeMenu} className={`nav-link ${isActive("/om-marianne")}`}>Om Marianne</Link>
                    </li>
                    { /* TODO: DISCUSS: mor vil gerne have de sidste to byttet, men jeg kan bedre lide det her*/}
                    <li className="nav-item">
                        <Link to="/ydelser" onClick={closeMenu} className={`nav-link ${isActive("/ydelser")}`}>Ydelser</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/kontakt" onClick={closeMenu} className={`nav-link ${isActive("/kontakt")}`}>Kontakt</Link>
                    </li>

                </ul>
            </div>
        </nav>
    );
}
