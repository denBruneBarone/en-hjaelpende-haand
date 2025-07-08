import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./src/pages/App.jsx";
import Home from "./src/pages/Home.jsx"
import Kontakt from "./src/pages/Kontakt.jsx";
import Login from "./src/pages/Login.jsx";
import Submissions from "./src/pages/Submissions.jsx";
import AyurvediskProfil from "./src/pages/AyurvediskProfil.jsx";
import Om from "./src/pages/Om.jsx";
import Sygedagpenge from "./src/pages/Sygedagpenge.jsx";
import Ydelser from "./src/pages/Ydelser.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="kontakt" element={<Kontakt />} />
                <Route path="login" element={<Login />} />
                <Route path="submissions" element={<Submissions />} />
                <Route path="ayurvedisk-profil" element={<AyurvediskProfil />} />
                <Route path="om-marianne" element={<Om />} />
                <Route path="sygedagpenge" element={<Sygedagpenge />} />
                <Route path="ydelser" element={<Ydelser />} />

            </Route>
        </Routes>
    </BrowserRouter>
);