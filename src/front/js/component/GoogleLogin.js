import { useGoogleLogin } from "@react-oauth/google";
import React from "react";
import { useState, useEffect } from "react";
export const GoogleLogin = () => {
  
  const [user, setUser] = useState("");
  const [profile, setProfile] = useState("");	
  
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {setUser(codeResponse)
      console.log(codeResponse)
    },
    onError: (error) => console.log("Login Failed:", error)
  });
useEffect(() => {
    if (user) {
            fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
                method: "GET",
                headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: "application/json",
            },
          }
        )
        .then((res) => res.json())
        .then((res) => {
            setProfile(res);
            fetch('https://congenial-eureka-gxx54wx9xg4hvrxr-3001.app.github.dev/api/auth/google', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${profile.access_token}`,
                    'Content-Type': 'application/json'
                    
                },
                body: JSON.stringify(profile)
            })
            .then(res => res.json())
            .then(res => {
                console.log("Usuario autenticado y almacenado:", res);
            })
            .catch(error => {
                console.error("Error al autenticar y almacenar el usuario:", error);
            });
        })
        .catch((err) => console.log(err));
}
  }, [user]);
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