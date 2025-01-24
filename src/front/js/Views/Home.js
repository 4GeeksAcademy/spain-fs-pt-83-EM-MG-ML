import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { SmallHabit } from "../component/smallhabit";
import { HabitCard } from "../component/habitcard";
import { NewHabitCard } from "../component/newhabitcard";
import { User } from "../component/user";
import { UserScore } from "../component/userscore";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<SmallHabit />
			<HabitCard />
			<NewHabitCard />
			<User />
			<UserScore />
		</div>
	);
}
