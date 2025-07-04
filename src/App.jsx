import React from "react";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-4">Marianne Eberhardt - En Støttende Hån</h1>
      <p className="lead">Jeg støtter, men håner dig</p>
      <Link to="/kontakt" className="btn btn-primary">Kontakt mig!</Link>
    </div>
  );
}
