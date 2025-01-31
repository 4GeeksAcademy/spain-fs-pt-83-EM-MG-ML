import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { SmallHabit } from "../component/smallhabit";
import { HabitCard } from "../component/habitcard";
import { NewHabitCard } from "../component/newhabitcard";
import { User } from "../component/user";
import { UserScore } from "../component/userscore";

export const Home = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getHabits();
        actions.getUser();
        actions.getUserHabits();
    }, []);

    return (
        <div>
          
            {/* <User user={store.user} />  */}

            {
                store.habits.map((habit, index) => {
                    return <SmallHabit key={index} habit={habit} />;
                })
            }

            {/* {
                store.user_habits.map((user_habits, index) => {
                    return <HabitCard key={index} user_habit={user_habits} />;
                })
            } */}
        </div>
    );
}
