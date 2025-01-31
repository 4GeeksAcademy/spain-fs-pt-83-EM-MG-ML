import { useGoogleLogin } from "@react-oauth/google";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const GoogleLogin = () => {

  const navigate = useNavigate();
  const [googleUser, setGoogleUser] = useState("");
  const [userData, setUserData] = useState([""]);

  
  const signUp = useGoogleLogin({
    onSuccess: (codeResponse) => {setGoogleUser(codeResponse)
      console.log(codeResponse)
    },
    onError: (error) => console.log("Login Failed:", error),
    
    
  });

  useEffect(() => {
    if (googleUser) {
        fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${googleUser.access_token}`,
                Accept: "application/json",
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log("Received data:", data);
            const googleUserData = {
                "google_id": data.id,
                "name": data.name,
                "email": data.email
            };
            setUserData(googleUserData);  
        })
        .catch(error => console.error("Error al autenticar y almacenar el usuario:", error));
    }
}, [googleUser]); 

useEffect(() => {
    if (userData) {
        fetch(`${process.env.BACKEND_URL}api/signup/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log("Response from backend:", data);
            if (data.token) {
                console.log("Token received:", data.token);
                localStorage.setItem("token", data.token);
                navigate("/home");
            } else {
                console.error("No token received:", data);
            }
        })
        .catch((error) => console.error("Error al registrar usuario:", error));
    }
}, [userData]);


{
  console.log(userData)
}
  

  return (
          <div className="shadow-2xl">
            <button
              type="button"
              className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
              onClick={() => signUp()}
            >
              Sign in with Google
            </button>
          </div>
  );
};