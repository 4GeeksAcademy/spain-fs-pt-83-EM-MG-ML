import React, { useState } from 'react'
import "../../styles/Log-in.css";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/Visibility';

export const Login = ({loginAction}) => {

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);

const toggleShowPassword = () => {
  setShowPassword(!showPassword);
};


const handleSubmit = (e) => {
  e.preventDefault();
  loginAction(username, password);
}

  return (

    <div className="login-container">
      <form id="login-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

    <div className='password-container'>
        <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        requiered
        />

        <button type="button" className='visibility' onClick={toggleShowPassword}>
            {showPassword ? <VisibilityOff /> : <Visibility />}
        </button>
    </div>

        <button className="submit-button" type="submit">Login</button>
      </form>
    </div>

  )
}


// este comando irá en la página welcome
// pasaremos la action del store mediante props

// <Login loginAction={actions.login}/>