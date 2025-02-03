const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: null,
			userProfilePicture:[],
			ranking: [],
			habits: [],
			user_habits: []

			// user: null,
			// ranking: [],
			// habits: [],
			// user_habits: []
		},
		actions: {
			login: async (email, password, navigate) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}api/login`, {
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

					const token = data.token;
					if (!token) {
						"No se recibió el token"
					};
					localStorage.setItem("token", token)

					const actions = getActions();
					actions.getUser();
					navigate("/home")
					setStore({
						token: token
					})
				} catch (error) {
					console.log("Error al iniciar sesión", error);
					alert("Error al iniciar sesión")
				}
			},

			googleLogin: async () => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}api/google-login`, {
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

			getRanking: () => {
				try {
					fetch(`${process.env.BACKEND_URL}api/ranking`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json"
						}
					}).then((resp) => {
						if (!resp.ok) {
							throw new Error("Error al añadir la informacion");
						}
						return resp.json();
					})
						.then(respJson => {
							const store = getStore();
							const rankingList = respJson.ranking;
							setStore({ ranking: rankingList });
							console.log(rankingList)
						})
				} catch {
					(err => console.error(err))
				}


			},

			updateToken: () => {
				console.log(localStorage.getItem("token"));

				if (localStorage.getItem("token")) {
					setStore({ token: localStorage.getItem("token") })
				}
				console.log(getStore().token);

			},

			signUp: async (dataUser, navigate) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}api/signup`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(dataUser)
					});

					if (!resp.ok) {
						throw new Error("Error en el registro");
					}

					const data = await resp.json();
					console.log("Usuario registrado exitosamente", data);
					const token = data.token;
					if (!token) {
						"No se recibió el token"
					};
					localStorage.setItem("token", token)

					const actions = getActions();
					actions.getUser();
					navigate("/home")
					setStore({
						token: token
					})
				} catch (error) {
					console.log("Error en el registro", error);
				}
			},

			getUser: async () => {
				const token = localStorage.getItem('token');
				if (token) {
					try {
						const resp = await fetch(`${process.env.BACKEND_URL}api/user/`, {
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${token}`
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

				}


			},

			getHabits: async () => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}api/habits`, {
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

			getUserHabits: async () => {
				const token = localStorage.getItem("token");
				if (token) {

					try {

						const resp = await fetch(`${process.env.BACKEND_URL}api/user/habits`, {
							method: "GET",
							headers: {
								"Content-Type": "application/json",
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
						console.log("Error al obtener los hábitos del usuario(token)", error);
					}
				}
			},

			addHabit: (habit) => {
				const token = localStorage.getItem('token');
				const store = getStore();
				const userHabits = store.user_habits || [];
				if (!userHabits.includes(habit)) {
					fetch(`${process.env.BACKEND_URL}api/user/habits`, {
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

			logout: () => {
				localStorage.removeItem("token")
				setStore({
					token: null,
					user: null
				})
			},

			deleteAccount: async (e) => {
				e.preventDefault();
				console.log(e);
				const password = e.target.elements[0].value;

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem("token")}`

						},
						body: JSON.stringify({
							password
						})

					});

					if (response.ok) {
						alert("Cuenta eliminada con éxito.");
						localStorage.removeItem("token"); // Eliminar el token
						setmodalDelete(false)
						navigate("/"); // Redirigir a la página de inicio
					} else {
						alert("Error al eliminar la cuenta.");
					}
				} catch (error) {
					console.error("Error al eliminar la cuenta:", error);
					alert("Error al eliminar la cuenta.");
				}
			},

			updateUser: async (e, data) => {
				e.preventDefault();
				console.log(e);
				const password = e.target.elements[0].value;

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem("token")}`
						},
						body: JSON.stringify({
							password,
							data
						})

					});

				}
				catch (error) {
					console.error("Error al modificar los datos del usuario.", error);
					alert("Error al modificar los datos del usuario.");
				}
			},

				handleImageUpload: (file) => {
					const imageUrl = URL.createObjectURL(file); 
					
					// Almacenar la imagen en el store
					setStore({ userProfilePicture: "imageUrl" });
	
					// Guardar en localStorage
					localStorage.setItem("image", imageUrl);
				},
	
				handleDeletePicture: () => {
					// Eliminar la imagen del store y localStorage
					setStore({ userProfilePicture: "" });
					localStorage.removeItem("image");
				},
		}
	};

}

export default getState;