import React, { Component } from "react";
import "../../styles/userscore.css";

export const UserScore = () => {

return(

        <div className="user_score_component">
            <div className="user_score_box">
                <img src={"rigo-baby.jpg"} className="user_score_circle"></img>
                <div className="user_text">
                    <div className="user_score_name">Nombre de usuario</div>
                    <div className="user_score_city">Ciudad</div>
                </div>
            </div>
            <div>
                <div className="user_score_pill">
                    <h5>125</h5>
                    <p>puntos</p>
                </div>
            </div>
    
        </div>
    )
}
