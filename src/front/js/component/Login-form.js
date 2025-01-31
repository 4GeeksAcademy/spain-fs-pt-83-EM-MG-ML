import React, { useState, useContext } from 'react'
import "../../styles/Log-in.css";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import {Context} from "../store/appContext"

export const Login = ({ loginAction }) => {
  
const { store, actions} = useContext(Context)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate()
  const loginUser = async () => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "email": username,
        "password": password
      })
    })
    const data = await response.json()
    console.log(data);
    if (data.token) {
      actions.login(data.token)
     
    }

  }
  const handleSubmit = (e) => {
    e.preventDefault();
     loginUser()
     navigate("/home")
  }

  return (

    <div className="login-container">
      <form id="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
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

        <button type="button" className='visibility' onClick={toggleShowPassword}></button>
    </div>

        <button className="submit-button" type="submit">Login</button>
      </form>
    </div>

  )
}


// este comando irá en la página welcome
// pasaremos la action del store mediante props

// <Login loginAction={actions.login}/>