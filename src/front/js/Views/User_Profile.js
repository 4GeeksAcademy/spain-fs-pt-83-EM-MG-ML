import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import Button from '@mui/material/Button';


export const UserProfile = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate()
console.log(user);

    const getUser = async () => {

       const response = await fetch(`${process.env.BACKEND_URL}/api/user/`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            
        })

        if (!response.ok) {
            throw ("Error al obtener los datos del usuario");
        }else {
            const data=await response.json()
            console.log(data);
            setUser(data)
        }
    }
        const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

useEffect(()=>{
    getUser()
}, [])

    return (
        <div className="profile-container">
            <h1 className="profile-title">Hola {user.first_name} {user.last_name}</h1>

            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-image"></div>
                    <div className="profile-info">
                        <h2>{user.first_name}</h2>
                        <h5 className="profile-phrase">“Frase de perfil”</h5>
                    </div>
                </div>

                <div className="profile-options"  style={{ display: "flex", flexDirection: "column", gap: "10px"}}>
                    <Link to="/profile-details" className="profile-option">Datos de perfil</Link>
                    <Link to="/change-password" className="profile-option">Contraseña</Link>
                    <Link to="/support" className="profile-option">Soporte</Link>
                    <Link to="/delete-account" className="profile-option delete-option">Eliminar cuenta<HeartBrokenIcon /></Link>
                </div>
            </div>

            <div className="logout">
            <Button href="#text-buttons"onClick={handleLogout}>Cerrar sesión <LogoutIcon /></Button>
               
            </div>
        </div>
    );
};