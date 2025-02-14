import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import { Context } from "../store/appContext";
import LightModeIcon from '@mui/icons-material/LightMode';
import { DarkMode } from "./DarkMode.js";
import habitLogo from "../../img/habitLogo.png";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
    const [isOpen, setIsOpen] = useState(false);
    const user = store.user;

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 800);
    };

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleLogout = () => {
        actions.logout();
        navigate("/");
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
                    {user ? ( // Si hay usuario, muestra el menú
                        <div className="burger-menu">
                            <button className="burger-button" onClick={() => setIsOpen(true)}>
                                <MenuIcon className="burger-icon"/>
                            </button>
                            <div className="burger-content-container" style={{ display: isOpen ? "block" : "none" }}>
                                <div className="head-handlres-burguer">
                                    <button className="close-button" onClick={() => setIsOpen(false)}>
                                        <CloseIcon />
                                    </button>
                                    <DarkMode style={{paddingInline:"5px", paddingBlock:"10px"}}/> 
                                </div>
                                <div className="burger-content">
                                    <ul>
                                        <li >
                                            <CottageOutlinedIcon style={{color:"var(--burguer_icon)"}} /><Link to="/home" onClick={handleClose}>Mi tablero</Link>
                                        </li>
                                        <li>
                                            <InsertChartOutlinedIcon /><Link to="/ranking" onClick={handleClose}>Ranking</Link>
                                        </li>
                                        <li>
                                            <AccountCircleOutlinedIcon /><Link to="/perfil" onClick={handleClose}>Perfil</Link>
                                        </li>
                                    </ul>
                                    <div className="logout-menu">
                                        <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null} 
                    <div className="s-title">
                        My habits
                    </div>
                </>
            ) : (
                <div className="complete-menu">
                    <div className="logo">
                        <img src={habitLogo}
                            onClick={() => navigate("/home")}
                            style={{ cursor: "pointer", width: "30px"}}>
                        </img>
                        <span className="complete-menu-title">My habits</span>
                    </div>
                    {user ? ( // Si el usuario está loggeado, muestra los enlaces
                        <div className="menu">
                            <Link to="/home">Mi tablero</Link>
                            <Link to="/ranking">Ranking</Link>
                            <Link to="/perfil">Perfil</Link>
                            
                            <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
                            
                        </div>
                    ) : null}
                    <DarkMode /> 
                    {/* Si no hay usuario, no muestra los enlaces */}
                </div>
            )}
        </nav>
    );
};
