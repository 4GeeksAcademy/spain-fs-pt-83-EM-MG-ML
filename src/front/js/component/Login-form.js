import React, { useState, useContext } from 'react'
import "../../styles/Log-in.css";
import { useNavigate } from "react-router-dom";
import {Context} from "../store/appContext"
export const Login = () => {
const { store, actions} = useContext(Context)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
    
    

  
  const handleSubmit = (e) => {
    e.preventDefault();
    actions.login(email, password)
     navigate("/home")
  }

  return (

    <div className="login-container">
      <form id="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          requiered
        />

        <button className="submit-button" type="submit">Login</button>
      </form>
    </div>

  )
}


// este comando irá en la página welcome
// pasaremos la action del store mediante props

// <Login loginAction={actions.login}/>