import "../../styles/user.css";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { FirstPage } from "@mui/icons-material";


export const User = ({user}) => {
  const { store, actions } = useContext(Context);

  console.log("Habit props:", user);
  return (
    <div className="user_component">
      <img className="user_circle"></img>
      <div className="user_text">
        <div className="user_name">{user.first_name}</div>
        <div className="user_city">{user.city}</div>
      </div>
    </div>
  );
}
