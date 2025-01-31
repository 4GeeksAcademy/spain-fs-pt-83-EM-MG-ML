import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BackendURL } from "./component/backendURL";
import "../../../src/front/styles/Styles.css"
import { Home } from "./Views/Home.js";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Welcome } from "./Views/Welcome.js";
import { Ranking } from "./Views/Ranking.js";
import { UserProfile } from "./Views/User_Profile.js";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div className="main-cont">
            <BrowserRouter basename={basename}>
                    <Navbar />
                    <Routes>
                        <Route element={<Welcome />} path="/" />
                        <Route element={<Home />} path="/home" />
                        <Route element={<Ranking />} path="/ranking" />
                        <Route element={<UserProfile />} path="/perfil" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
