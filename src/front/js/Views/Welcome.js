import React, { useState } from 'react';
import "../../styles/welcome.css";
import { Login } from '../component/Login-form';
import { SignUp } from '../component/Sign-up-form';
import CloseIcon from '@mui/icons-material/Close';
import { GoogleLogin } from '../component/GoogleLogin';
import { Hello_cuate } from "../../img/Hello-cuate.png"


export const Welcome = () => {

  if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >

  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);

  const openLoginModal = () => { setLoginModal(true) };
  const closeLoginModal = () => { setLoginModal(false) };

  const openSignUpModal = () => { setSignUpModal(true) };
  const closeSignUpModal = () => { setSignUpModal(false) };


  return (
    
    <div className="welcome-cont">
      <div></div>
      <h1>Bienvenid@ a tu habbit tracker</h1>
      <div className="accesos">
          <div className="login">
            <p>¿Ya tienes cuenta?</p>
            <button className="Login" onClick={openLoginModal}>Login</button>
          </div>
          <div className="divider"></div>
          <div className="signup">
            <p>¿Eres nuevo?</p>
            <button className="sign-up" onClick={openSignUpModal}>Sign up</button>
          </div>
      </div>
      <div className="acceso-google">
        <GoogleLogin />
      </div>

{/* MODAL --- LOGIN */}

      <div className="modal-login"  
        isOpen={loginModal}
        style={loginModal ? {display: "flex"} : {display: "none"}}
        onRequestClose={closeLoginModal}
        >
        
        <div className='wrapper'>
          <CloseIcon className="close" onClick={closeLoginModal}/>
          <h5>Accede con tu cuenta</h5>
          <Login loginAction={""}/>
        </div>
      </div>


{/* MODAL --------------- SIGNUP */}

      <div className="signup-login"  
        isOpen={signUpModal}
        style={signUpModal ? {display: "flex"} : {display: "none"}}
        onRequestClose={closeSignUpModal}
        >
        
        <div className='wrapper'>
          <CloseIcon className="close" onClick={closeSignUpModal}/>
          <SignUp loginAction={""}/>
          {/* <img src="Hello-cuate.png" style={{ width:'150px' }}/> */}
        </div>
      </div>
    </div>
  );
}