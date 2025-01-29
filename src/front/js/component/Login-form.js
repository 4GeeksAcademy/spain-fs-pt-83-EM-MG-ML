import React, { useState } from 'react'
import "../../styles/Log-in.css";
import { useNavigate } from "react-router-dom";

export const Login = ({ loginAction }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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