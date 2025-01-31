import "../../styles/newhabitcard.css";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const NewHabitCard = () => {
    const { store, actions } = useContext(Context);
    return (
    <div className="new_habit_component">
        <div className="new_habit_title">{store.habits.name}</div>
        <div className="new_habit_box">
            <div className="new_habit_button"><i className="fa-solid fa-plus"></i></div>
        </div>
    </div>
    );
};  