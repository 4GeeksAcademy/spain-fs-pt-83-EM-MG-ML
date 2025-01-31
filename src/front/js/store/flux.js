const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: null,
			ranking: [],
			habits: [],
			user_habits: []

			// user: null,
			// ranking: [],
			// habits: [],
			// user_habits: []
		},
		actions: {
			getUser: async () => { 
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}api/user/`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem('token')}`
						}
					});
					if (!resp.ok) {
						throw new Error("Error al obtener la lista de usuarios");
					}

					const data = await resp.json();
					console.log("usuario:", data);
					
					setStore({ user: data });
				} catch (error) {
					console.log("Error al obtener el usuario", error);
				}
			},

			getHabits: async () => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/habits`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json"
						}
					});

					if (!resp.ok) {
						throw new Error("Error al obtener la lista de hábitos");
					}

					const data = await resp.json();
					console.log("Lista de hábitos:", data);
					
					setStore({ habits: data.habits });
				} catch (error) {
					console.log("Error al obtener los hábitos", error);
				}
			},

			addHabit: (habit) => {
				const token = localStorage.getItem('token');
				const store = getStore();
				const userHabits = store.user_habits || [];
				if (!userHabits.includes(habit)) {
					fetch(`${process.env.BACKEND_URL}/api/user/habits`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							'Authorization': `Bearer ${token}`
						},
						body: JSON.stringify({ habit_id: habit.id })
					});
					setStore({ user_habits: [...userHabits, habit] });
				}
			},
			login: async (email, password) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/login`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ email, password })
					});

					if (!resp.ok) {
						throw new Error("Error al iniciar sesión");
					}

					const data = await resp.json();
					console.log("Inicio de sesión exitoso:", data);
					setStore({ token: data.token });
				} catch (error) {
					console.log("Error al iniciar sesión", error);
				}
			},


			logout: () => {
				localStorage.removeItem("token");
				console.log("Cierre de sesión exitoso");
			},

			signUp: async (email, password) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							email,
							password
						})
					});

					if (!resp.ok) {
						throw new Error("Error en el registro");
					}

					const data = await resp.json();
					console.log("Usuario registrado exitosamente", data);
				} catch (error) {
					console.log("Error en el registro", error);
				}
			},

			googleLogin: async () => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/google-login`, {
						method: "GET"
					});

					if (!resp.ok) {
						throw new Error("Error en el inicio de sesión con Google");
					}

					const tokenJson = await resp.json();
					localStorage.setItem("token", tokenJson.access_token);
					console.log("Inicio de sesión con Google exitoso");
				} catch (error) {
					console.log("Error", error);
				}
			},

			getUserHabits: async () => {
				try {
					const token = localStorage.getItem("token");
					if (!token) {
						throw new Error("No hay token disponible");
					}

					const resp = await fetch(`${process.env.BACKEND_URL}/api/user/habits`, {
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`
						}
					});

					if (!resp.ok) {
						throw new Error("Error al obtener los hábitos del usuario");
					}

					const data = await resp.json();
					console.log("Hábitos del usuario:", data);
					setStore({ user_habits: data.user_habits });
				} catch (error) {
					console.log("Error al obtener los hábitos del usuario", error);
				}
			},
			login: (token) => {
				localStorage.setItem("token", token)
				setStore({
					token:token
				})
			},
			logout: () => {
				localStorage.removeItem("token")
				setStore({
					token:null
				})
			},
			updateToken:()=>{
				console.log(localStorage.getItem("token"));
				
				if (localStorage.getItem("token")){
					setStore({token:localStorage.getItem("token")})
				}
				console.log(getStore().token);
				
			}


		}
	}
};

export default getState;