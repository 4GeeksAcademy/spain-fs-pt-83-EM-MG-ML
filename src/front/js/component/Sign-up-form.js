import React, { useState } from 'react'
import "../../styles/Log-in.css";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/Visibility';

export const SignUp = () => {

const [firstName, setfirstName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState('');
const [showPasswordA, setShowPasswordA] = useState(false);
const [showPasswordB, setShowPasswordB] = useState(false);

const toggleShowPasswordA = () => {
  setShowPasswordA(!showPasswordA);
};
const toggleShowPasswordB = () => {
  setShowPasswordB(!showPasswordB);
};


const handleSubmit = (e) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden");
    return;
  }

  loginAction(firstName, lastName, email, password);
}

  return (
    <div className="signup-box">
    <h5 className='signup-title'>Vamos a necesitar que nos cuentes más de ti</h5>
    <form id="signup-form" onSubmit={handleSubmit}>
        
        <input 
          type="text" 
          placeholder="First Name..." 
          // value={""}
          onChange={(e) => setfirstName(e.target.value)}
          pattern="[A-Za-z]{3-16}"
          required
        />

        
        <input 
          type="text" 
          placeholder="Last Name..." 
          // value={""}
          onChange={(e) => setLastName(e.target.value)}
          pattern="[A-Za-z]{3-16}"
          required
        />

        
        <input 
          type="text" 
          placeholder="Email..." 
          // value={""}
          onChange={(e) => setEmail(e.target.value)}
          pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
          required
        />
        
        <div className='password-box'>
        
        <input 
          type={showPasswordA ? "text" : "password"} 
          placeholder="Password..." 
          // value={"lastName"}
          onChange={(e) => setPassword(e.target.value)}
          pattern="[A-Za-z][0-9]{3-16}"
          required
        />
        <Visibility className='visibility' onClick={toggleShowPasswordA} />
        </div>
        <div className='password-box'>

        <input 
          type={showPasswordB ? "text" : "password"} 
          placeholder="Confirm Password..." 
          // value={"lastName"}
          onChange={(e) => setConfirmPassword(e.target.value).setUsername(e.target.value)}
          required
        >
        </input>
        <Visibility className="visibility" onClick={toggleShowPasswordB} />
        </div>
        <button className="signup-submit-button" type="submit">Signup</button>
      </form>
      
    </div>
  )
}
