import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import Button from '@mui/material/Button';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LockResetIcon from '@mui/icons-material/LockReset';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';

export const UserProfile = () => {
    const { store, actions } = useContext(Context);
    const user = store.user;
    const navigate = useNavigate()
    console.log(user);
    const [modalDelete, setmodalDelete] = useState(false)
    if (!user) return null;
    const handleLogout = () => {
        actions.logout()
        navigate("/");
    };



    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        console.log(e);
        const password = e.target.elements[0].value;

        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/user/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`

                },
                body: JSON.stringify({
                    password
                })



            });

            if (response.ok) {
                alert("Cuenta eliminada con éxito.");
                localStorage.removeItem("token"); // Eliminar el token
                setmodalDelete(false)
                navigate("/"); // Redirigir a la página de inicio
            } else {
                alert("Error al eliminar la cuenta.");
            }
        } catch (error) {
            console.error("Error al eliminar la cuenta:", error);
            alert("Error al eliminar la cuenta.");
        }
    };



    return (
        <div className="profile-container" style={{ display: "flex", flexDirection: "column" }}>
            <h1 className="profile-title">Hola {user.first_name} {user.last_name}</h1>

            <div className="modal-login"
                isOpen={modalDelete}
                style={modalDelete ? { display: "flex" } : { display: "none" }}

            >

                <div className='wrapper'>
                    <CloseIcon className="close" onClick={() => setmodalDelete(false)} />
                    <h5>Accede con tu cuenta</h5>
                    <form id="delete-form" onSubmit={handleDeleteAccount}>

                        <input
                            type="password"
                            placeholder="Password"
                            requiered
                        />

                        <button className="submit-button" type="submit">Login</button>
                    </form>
                </div>
            </div>

            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-image"></div>
                    <div className="profile-info">

                        <h5 className="profile-phrase">“Frase de perfil”</h5>
                    </div>
                </div>


            </div>

            <div className="profile-options" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Button onClick={() => navigate("/profile-details")} className="profile-option">
                    Datos de perfil <AssignmentIndIcon sx={{ marginLeft: 1 }} />
                </Button>

                <Button onClick={() => navigate("/change-password")} className="profile-option">
                    Cambiar contraseña <LockResetIcon sx={{ marginLeft: 1 }} />
                </Button>

                <Button onClick={() => navigate("/support")} className="profile-option">
                    Soporte <SupportAgentIcon sx={{ marginLeft: 1 }} />
                </Button>

                <Button onClick={() => setmodalDelete(true)}>
                    Eliminar cuenta <HeartBrokenIcon sx={{ marginLeft: 1 }} />
                </Button>

                <Button onClick={handleLogout}>
                    Cerrar sesión <LogoutIcon sx={{ marginLeft: 1 }} />
                </Button>

            </div>
        </div>
    );
};
