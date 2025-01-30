import { useGoogleLogin } from "@react-oauth/google";
import React from "react";
import { useState, useEffect } from "react";
export const GoogleLogin = () => {
  
  const [googleUser, setGoogleUser] = useState("");
  const [userName, setUserName] = useState([])
  const [userEmail, setUserEmail] = useState([])
  const [userGoogleId, setuserGoogleId] = useState([])

  
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {setGoogleUser(codeResponse)
      console.log(codeResponse)
    },
    onError: (error) => console.log("Login Failed:", error)
  });

useEffect(() => {
    if (googleUser) {
            fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`,
          {
                method: "GET",
                headers: {
                Authorization: `Bearer ${googleUser.access_token}`,
                Accept: "application/json",
            },
          }
        )
        .then((resp) => {
          console.log("Response object:", resp); // Verifica el objeto de respuesta
          return resp.json();
        })
        .then((data) => {
          console.log("Received data:", data); // Verifica qué datos se están recibiendo
          
          if (!data || Object.keys(data).length === 0) {
            throw new Error("No se recibieron datos del usuario.");
          }
  
          setUserName(data.name);
          setUserEmail(data.email);
          setuserGoogleId(data.id);
  
          console.log("User Name:", data.name);
          console.log("User Email:", data.email);
          console.log("User Google ID:", data.id);
        })
        .catch(error => {
              console.error("Error al autenticar y almacenar el usuario:", error);
            })
  }}, [googleUser]);
  
  useEffect(() => {
    if (userName && userEmail && userGoogleId) {
      const userData = {
        email: userEmail,
        google_id: userGoogleId,
      };
  
      fetch("https://congenial-eureka-gxx54wx9xg4hvrxr-3001.app.github.dev/api/signup/google/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((resp) => {
          if (!resp.ok) throw new Error(`HTTP error! Status: ${resp.status}`);
          return resp.json();
        })
        .then((data) => console.log("User successfully registered:", data))
        .catch((error) => console.error("Error al registrar usuario:", error));

  }}, [userName, userEmail, userGoogleId]); // Se ejecuta cuando estos valores cambian
  

   



  return (
          <div className="shadow-2xl">
            <button
              type="button"
              className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
              onClick={() => login()}
            >
              Sign in with Google
            </button>
          </div>
  );
};