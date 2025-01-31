import "../../styles/smallhabit.css";
import React from "react";

export const SmallHabit = ({ habit }) => {
    return (
        <div className="small_habit_component">
            <div className="small_habit_title">{habit.name}</div>
            <div className="small_habit_box">
                <div className="small_habit_button"><i className="fa-solid fa-plus"></i></div>
            </div>
        </div>
    );
};