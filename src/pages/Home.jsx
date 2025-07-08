import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="container mt-5 text-center">
            <h1 className="display-4">Marianne Eberhardt(NO) - En Hjelpende Hån</h1>
            <p className="lead">Jeg hjelper, men håner dig!</p>
            <div>
                <Link to="/kontakt" className="btn btn-primary">Kontakt mig!</Link>
            </div>

            <div className="mt-3">
                <img
                    src="/assets/img/haan.png"
                    alt="Marianne Eberhardt logo"
                    className="img-fluid rounded shadow-lg"
                    style={{ maxWidth: "1024px", width: "100%" }}
                />
            </div>

        </div>
    );
}
