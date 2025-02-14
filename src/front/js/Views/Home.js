import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { SmallHabit } from "../component/smallhabit";
import { HabitCard } from "../component/habitcard";
import { NewHabitCard } from "../component/newhabitcard";
import { User } from "../component/user";
import { UserScore } from "../component/userscore";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {

  const { store, actions } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const [fetched, setFetched] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/")
    }
    if (!fetched) {

      Promise.all([
      actions.getHabits(),
      actions.getUser(),
      actions.getUserHabits(),
      actions.getRanking(),
      actions.getHabitRecord()
       
    ])
        .then(() => {
          setFetched(true);
        })
        .catch((error) => {
          console.error("Error fetching data", error);
        });
    }

  }, []);
  if (!fetched) return null;
  
  const filteredHabits = store.habits.filter((habit) =>
    habit.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
 

  return (
    <div className="home">
      <div className="containerr">
        {/* Sección Ranking con carrusel */}
        <section className="carousel-section">
          <h2>Ranking</h2>
          <div className="carousel ranking-carousel">
            {store.ranking.map((user) => (
              <UserScore
                key={`${user.id}-${user.name}`}
                name={user.first_name}
                city={user.city}
                score={user.score}
                gender={user.gender}
              />
            ))}
          </div>
        </section>


        {/* Sección Habits con Buscador */}
        <section className="carousel-section">
          <div className="carousel-header">
            <h2>Hábitos</h2>
          
              {/* Input de búsqueda */}
              <input 
                type="text"
                placeholder="Buscar hábito..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
              />
          </div>

          <div className="carousel small-habits-carousel">
            {filteredHabits.length > 0 ? (
              filteredHabits.map((habit, index) => (
                <SmallHabit key={index} habit={habit} />
              ))
            ) : (
              <p>No se encontraron hábitos</p>
            )}
          </div>
        </section>

        {/* Sección user_habits */}
        <section className="carousel-section">
          <h2>Mis Hábitos</h2>
          <div className="carousel small-habits-carousel">
            {store.user_habits && store.user_habits.length > 0 ? (
              store.user_habits.map((user_habit, index) => (
                <HabitCard key={index} user_habit={user_habit} />
              ))
            ) : (
              <div className="no-habits">¡Empieza a añadir tus hábitos!</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}