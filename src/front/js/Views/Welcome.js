import React, { useState } from 'react';
import "../../styles/welcome.css";
import { Login } from '../component/Login-form';
import { SignUp } from '../component/Sign-up-form';
import { GoogleLogin } from "../component/googlelogin.js";
import { Modal } from "../component/modal.js";

import  { Calendar } from "../../img/Calendar.png";


export const Welcome = () => {

  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);

  const openLoginModal = () => { setLoginModal(true) };
  const closeLoginModal = () => { setLoginModal(false) };

  const openSignUpModal = () => { setSignUpModal(true) };
  const closeSignUpModal = () => { setSignUpModal(false) };

  // <SignUp />


  return (

    <div className="welcome-cont">
      <div className="Hero-img">
        <img 
        src="Calendar.png"
        loading="lazy"
        />
        
      </div>
      <div className='access-control'>
        <h1>Bienvenid@ a tu rastreador de hábitos</h1>
        <div className="accesos">
        <div className="login">
          <p>¿Ya tienes cuenta?</p>
          <button className="Login" onClick={openLoginModal}>Inicia sesión</button>
        </div>
        <div className="divider"></div>
        <div className="signup">
          <p>¿Eres nuevo?</p>
          <button className="sign-up" onClick={openSignUpModal}>Regístrate</button>
        </div>
        </div>
        <div className="acceso-google">
        <p>o accede con:</p>
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
            fetch(`${process.env.BACKEND_URL}api/signup/google`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(credentialResponse)
            })
              .then(response => response.json())
              .then(data => console.log('Datos enviados al backend:', data))
              .catch(error => console.error('Error al enviar los datos al backend:', error));
          }}
          onError={() => console.log('Login Failed')}
        />
        </div>
      </div>


      {/* MODAL --- LOGIN */}
      <Modal
        className="modal-login"
        isOpen={loginModal}
        close={closeLoginModal}
        title="Bienvenid@ de nuevo"
      >
        <Login />
      </Modal>

      {/* MODAL --- SIGNUP */}
      <Modal
        className="modal-signup"
        isOpen={signUpModal}
        close={closeSignUpModal}
        title="Vamos a necesitar que nos cuentes más de ti"
      >
        <SignUp />
      </Modal>
    </div>
  );
};