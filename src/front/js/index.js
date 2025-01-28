import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "../styles/index.css";
import Layout from "./layout";


createRoot(document.getElementById('app')).render(

<StrictMode>
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
            <Layout />
    </GoogleOAuthProvider>
</StrictMode>

);


// ReactDOM.createRoot(document.querySelector("#root")).render(
//   <StrictMode>
//     <StyledEngineProvider injectFirst>
//     </StyledEngineProvider>
//   </React.StrictMode>

// );
