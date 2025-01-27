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
const [showPassword, setShowPassword] = useState(false);

const toggleShowPassword = () => {
  setShowPassword(!showPassword);
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
    <div className="signup-container">
    <h5>Vamos a necesitar que nos cuentes más de ti</h5>
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
        
        <div className='password-container'>
        
        <input 
          type={showPassword ? "text" : "password"} 
          placeholder="Password..." 
          // value={"lastName"}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
            <button type="button" className='visibility' onClick={toggleShowPassword}>
            {showPassword ? <VisibilityOff /> : <Visibility />}
            </button>
        </div>

        <div className='password-container'>

        <input 
          type={showPassword ? "text" : "password"} 
          placeholder="Confirm Password..." 
          // value={"lastName"}
          onChange={(e) => setConfirmPassword(e.target.value).setUsername(e.target.value)}
          required
        />
            <button type="button" className='visibility' onClick={toggleShowPassword}>
            {showPassword ? <VisibilityOff /> : <Visibility />}
            </button>
        </div>

        <div className='terms'>
          <input type='checkbox' id='terms' className="terms-box" name='terms' value='terms' required />
          <label for='terms'>Acepto los términos y condiciones</label>
        </div>
        <button className="submit-button" type="submit">Login</button>
      </form>
    </div>
  )
}
