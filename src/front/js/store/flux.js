import { Login, Logout } from "@mui/icons-material";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			datos: [],
		},
		actions: {
			getUsers: () => {
			},
			Login: () => {
			},
			Logout: () => {				
			},
			SignUp: () => {
			},
			Google: () => {
			},
			googleLogut: () => {
			},
			userHabits: () => {
			},


		}
	};
};

export default getState;
