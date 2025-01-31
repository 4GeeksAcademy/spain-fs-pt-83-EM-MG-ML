import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Styles.css";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Context } from "../store/appContext";
export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null); // Estado del usuario
    const handleResize = () => {
        setIsMobile(window.innerWidth <= 800);
    };
    const handleLogout = () => {
        actions.logout();
        setUser(null);
        navigate("/");
    };
    const getUser = async () => {
        if (!store.token) {
            setUser(null);
            return;
        }
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/user/`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${store.token}`
                },
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                setUser(null); //usuario no autenticado
            }
        } catch (error) {
            console.error("Error al obtener los datos del usuario:", error);
            setUser(null);
        }
    };
    useEffect(() => {
        getUser();
    }, [store.token]); // Se ejecuta cuando cambia el token
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
                                <MenuIcon />
                            </button>
                            <div className="burger-content-container" style={{ display: isOpen ? "block" : "none" }}>
                                <button className="close-button" onClick={() => setIsOpen(false)}>
                                    <CloseIcon />
                                </button>
                                <div className="burger-content">
                                    <ul>
                                        <li>
                                            <InsertChartOutlinedIcon /><Link to="/ranking">Ranking</Link>
                                        </li>
                                        <li>
                                            <AccountCircleOutlinedIcon /><Link to="/perfil">Perfil</Link>
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
                        Proyecto Ninja
                    </div>
                </>
            ) : (
                <div className="complete-menu">
                    <div className="logo">
                        <i className="fa-brands fa-google"
                            onClick={() => navigate("/home")}
                            style={{ cursor: "pointer" }}
                        ></i>
                        <span className="complete-menu-title">Proyecto Ninja</span>
                    </div>
                    {user ? ( // Si hay usuario, muestra los enlaces
                        <div className="menu">
                            <Link to="/ranking">Ranking</Link>
                            <Link to="/perfil">Perfil</Link>
                            <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
                        </div>
                    ) : null} {/* Si no hay usuario, no muestra los enlaces */}
                </div>
            )}
        </nav>
    );
};