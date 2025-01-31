import "../../styles/userscore.css";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const UserScore = (user) => {
    const { store, actions } = useContext(Context);
    return (
        <div className="user_score_component">
            <div className="user_score_box">
                <img className="user_score_circle"></img>
                <div className="user_text">
                    <div className="user_score_name">{user.first_name}</div>
                    <div className="user_score_city">{}</div>
                </div>
            </div>
            <div>
                <div className="user_score_pill">
                    <h5>{user.score}</h5>
                    <p>puntos</p>
                </div>
            </div>
        </div>
    );
}
