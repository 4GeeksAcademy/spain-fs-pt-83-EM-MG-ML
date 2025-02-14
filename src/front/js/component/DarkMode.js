import React, { useState } from "react";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import "../../styles/darkMode.css";

export const DarkMode = () => {
    const [active, setActive] = useState("False")

    const setDarkMode = () => {
        document.querySelector("body").setAttribute("data-theme", "dark")
        localStorage.setItem("selectedTheme", "dark")
    }
    const setLightMode = () => {
        document.querySelector("body").setAttribute("data-theme", "light")
        localStorage.setItem("selectedTheme", "ligth")
    }

    const selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme === "dark"){
        setDarkMode();
    }else{
        setLightMode();
    }

    const toggleTheme = () => {
        if (active == true) setDarkMode();
        else setLightMode()
    }
    return (
        <div className='dark_mode'>
            <button className="darkmode">
            { active ? 
             <DarkModeIcon 
             className="moon"
             onClick={() => {
                 setActive(false);
                 toggleTheme();
               }}
             />
            :
            <LightModeIcon 
            className="sun"
            onClick={() => {
                setActive(true);
                toggleTheme();
              }}
            />
           
    }
            </button>
        </div>
    );
};
