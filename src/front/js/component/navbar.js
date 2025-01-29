import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Styles.css";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import BathroomOutlinedIcon from '@mui/icons-material/BathroomOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export const Navbar = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
    const [isOpen, setIsOpen] = useState(false);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 800);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <nav className="navbar">
            {isMobile ? (
                <>
                <div className="burger-menu">
                    <button className="burger-button" onClick={() => setIsOpen(true)}>
                        <MenuIcon />
                    </button>
                    <div className="burger-content-container" style={{ display: isOpen ? "block" : "none" }}>
                        <button className="close-button" onClick={() => setIsOpen(false)}>
                            <CloseIcon />
                        </button>
                        <div className="burger-content" >
                           <ul>
                                <li>
                                    <BathroomOutlinedIcon /><Link to="/mis-habitos">Mis hábitos</Link>
                                </li>
                                <li>
                                    <InsertChartOutlinedIcon /><Link to="/ranking">Ranking</Link>
                                </li>
                                <li>
                                    <AccountCircleOutlinedIcon /><Link to="/perfil">Perfil</Link>
                                </li>
                           </ul>
                           
                            <div className="logout-menu">
                                <LogoutOutlinedIcon /><Link to="/logout">Logout</Link>
                            </div>
                          
                        </div>
                    </div>
                </div>
                <div className="s-title" >
                    Proyecto Ninja
                </div>
                </>
                
            ) : (
                <div className="complete-menu">
                    <div className="logo">
                        <i class="fa-brands fa-google"></i><span className="complete-menu-title">Proyecto Ninja</span>
                    </div>
                    <div className="menu">
                        <Link to="/mis-habitos">Mis hábitos</Link>
                        <Link to="/ranking">Ranking</Link>
                        <Link to="/perfil">Perfil</Link>
                        <button className="logout-button"><Link to="/logout">Logout</Link></button>
                    </div>
                </div>
            
            )}
        </nav>
    );
};