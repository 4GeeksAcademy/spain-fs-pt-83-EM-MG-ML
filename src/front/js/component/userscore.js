import "../../styles/userscore.css";
import React, { useEffect, useState } from "react";



export const UserScore = (props) => {

const [userAvatar, setUserAvat] = useState("");    

useEffect(()=>{
const profileAvatar = [
    "https://cdn-icons-png.flaticon.com/512/236/236831.png",
    "https://cdn-icons-png.flaticon.com/512/428/428573.png",
    "https://cdn-icons-png.flaticon.com/128/428/428933.png",
    "https://cdn-icons-png.flaticon.com/128/201/201634.png",
    "https://cdn-icons-png.flaticon.com/128/6833/6833595.png",
]
const randomNumber = Math.floor(Math.random() * 5)
const avatar = profileAvatar[randomNumber]
setUserAvat(avatar)

}, [])

    return (
        <div className="user_score_component">
            <div className="user_score_box">
                <img src={userAvatar} className="user_score_circle"></img>
                <div className="user_text">
                    <div className="user_score_name">{props.name}</div>
                    <div className="user_score_city">{}</div>
                </div>
            </div>
            <div>
                <div className="user_score_pill">
                    <h5>{props.score}</h5>
                    <p>puntos</p>
                </div>
            </div>
        </div>
    );
}
