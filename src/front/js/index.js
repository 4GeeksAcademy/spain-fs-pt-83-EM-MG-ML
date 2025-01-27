import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "../styles/index.css";
import Layout from "./layout";

const CLIENT_ID = "455286273020-58p2bq3j3c8v1sd467pq855265dvlsdv.apps.googleusercontent.com";


createRoot(document.getElementById('app')).render(

<StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
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
