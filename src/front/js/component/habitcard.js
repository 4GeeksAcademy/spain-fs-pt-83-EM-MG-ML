import "../../styles/habitcard.css";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Modal } from "./modal.js";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import "../../styles/userProfile.css";

export const HabitCard = ({ user_habit }) => {
    const { store, actions } = useContext(Context);
    const [isCompleted, setIsCompleted] = useState(null);
    const [isActive, setActive] = useState(false);

    // Verifica si el hábito ya fue completado hoy al cargar el componente
    console.log(store.user_records)
    useEffect(() => {
        const today = new Date().toDateString()
        const completedToday = store.user_records
            .some((record) => {
                return (
                    new Date(record.date).toDateString() === today &&
                    record.user_id === store.user.id &&
                    record.habits_id === user_habit.habit.id)
            });
        setIsCompleted(completedToday);


    }, [store.user_records, user_habit.habit.id]);




    const handleCompleteHabit = async () => {
        if (!isCompleted) {
            const success = await actions.completeHabit(user_habit.habit.id);
            if (success) {
                setIsCompleted(true)
            }
        };
    }

    const handleRemoveHabit = () => {
        actions.removeHabit(user_habit.habit);
    };

    return (

        <div className={`habit_component${isCompleted ? "_completed" : ""}`}>
            <div className="button_delete">
                <button className="remove_habit_button" onClick={handleRemoveHabit}>
                    
                    <i className="fa-solid fa-x"></i>
                </button>
                <div className="habit_title">{user_habit.habit.name}</div>
                <HelpOutlineIcon onClick={() => setActive(true)} style={{ marginRight: "20px", cursor: "pointer" }} />
            </div>
            <div className="habit_box">
                <div className="habit_status">{isCompleted ? "Completado" : "Completar"}</div>
                <button
                    className={`habit_button ${isCompleted ? "habit_button_completed" : ""}`}
                    onClick={handleCompleteHabit}
                    disabled={isCompleted}
                >{isCompleted ? "✔" : ""}</button>
            </div>
            <Modal className="modalUser"
                isOpen={isActive}
                title={user_habit.habit.name}
                close={() => setActive(false)}
                style={{paddingTop:"20px"}}
            >
                <img src={user_habit.habit.image} alt="Habit illustration" style={{ width: "170px", marginTop: "20px", borderRadius: "15px" }}
                />
                <div className="modal-content-habit" style={{padding:"20px"}}><p>{user_habit.habit.description}</p></div>
            </Modal>
        </div>
    );
};