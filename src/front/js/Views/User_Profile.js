import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
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
import { Modal } from "../component/modal";
import { Forms } from "../../img/Forms.png"
import "../../styles/userProfile.css";

export const UserProfile = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/")
        }
    }, [])
    const user = store.user;
    const navigate = useNavigate()
    console.log(user);
    const [modalSupport, setModalSupport] = useState(false)
    const [modalDelete, setmodalDelete] = useState(false)
    
    if (!user) return null;
    const handleLogout = () => {
        actions.logout()
        navigate("/");
    };
const handleDeleteAccount = (e) => {
        actions.deleteAccount(e);
    };

    return (
        <div className="profile-container">
            <h1 className="profile-title">Hola {user.first_name} {user.last_name}</h1>
            {/* --------Modal para modificar los datos de perfil del usuario-------- */}

            {/* --------Modal para modificar la contraseña del usuario-------- */}



            {/* --------Modal para soporte-------- */}
            <Modal
                className="modalDeleteUser"
                isOpen={modalSupport} close={() => { setModalSupport(false) }}
                title="Si necesitas ayuda, envíanos un correo a ermomageeks@gmail.com y te responderemos lo antes posible.">
                
            </Modal>


            {/* --------Modal para eliminar el usuario-------- */}
            <Modal
                className="modalDeleteUser"
                isOpen={modalDelete} close={() => { setmodalDelete(false) }}
                title="¿Confirmas que quieres eliminar tu cuenta? perderás todo el progreso obtenido">
                <form id="delete-form" onSubmit={handleDeleteAccount}>
                    <input
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        requiered
                    />
                    <button className="submit-button" type="submit">Confirmar eliminación</button>
                </form>
            </Modal>
            

            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-info">

                        <h5 className="profile-phrase">“Frase de perfil”</h5>
                    </div>
                </div>
            </div>
            <div className="profile-elements">
            <div className="profile-options">
                <div className="profile-items" onClick={() => navigate("/profile-details")}> 
                <AssignmentIndIcon /> Datos de perfil 
                </div>

                <div className="profile-items" onClick={() => navigate("/change-password")}>
                <LockResetIcon /> Cambiar contraseña 
                </div>

                <div className="profile-items" onClick={() => setModalSupport(true)}>
                <SupportAgentIcon /> Soporte 
                </div>

                <div className="profile-items" onClick={() => setmodalDelete(true)}>
                <HeartBrokenIcon /> Eliminar cuenta 
                </div>

                <div className="profile-items" onClick={handleLogout}>
                <LogoutIcon /> Cerrar sesión 
                </div>
            </div>
            <div className="profile-img"><img src="Forms.png" style={{width: "350px"}}/></div>
            </div>
        </div>
    );
};
