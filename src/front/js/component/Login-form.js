import React, { useState } from 'react'
import "../../styles/Log-in.css";
import { useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';

export const Login = ({ loginAction }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
      localStorage.setItem("token", data.token)
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

        <div className='password-box'>
        
        <input 
          type={showPassword ? "text" : "password"} 
          placeholder="Password..." 
          onChange={(e) => setPassword(e.target.value)}
          pattern="[A-Za-z][0-9]{3-16}"
          required
        />
        <Visibility className='visibility' onClick={toggleShowPassword} />
        </div>

        <button className="submit-button" type="submit">Login</button>
    </form>
  </div>

  )
}


// este comando irá en la página welcome
// pasaremos la action del store mediante props

// <Login loginAction={actions.login}/>