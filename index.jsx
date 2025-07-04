import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import App from "./src/App.jsx";
import Kontakt from "./src/Kontakt.jsx";
import Login from "./src/Login.jsx";
import Submissions from "./src/Submissions.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/login" element={<Login />} />
            <Route path="/submissions" element={<Submissions />} />
        </Routes>
    </BrowserRouter>
);