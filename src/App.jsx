import React from "react";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-4">Welcome to Bun + React</h1>
      <p className="lead">This is your homepage styled with Bootstrap.</p>
      <Link to="/kontakt" className="btn btn-primary">Kontakt mig!</Link>
    </div>
  );
}
