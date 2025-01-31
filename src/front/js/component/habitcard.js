import "../../styles/habitcard.css";
import React from "react";

export const HabitCard = ({ userhabit }) => {
    console.log("Habit props:", userhabit);
    return (
        <div className="habit_component">
            <div className="habit_title">{userhabit.name}</div>
            <div className="habit_box">
                <div className="habit_status">¿Completo?</div>
                <div className="habit_button"></div>
            </div> 
        </div>
    );
};
