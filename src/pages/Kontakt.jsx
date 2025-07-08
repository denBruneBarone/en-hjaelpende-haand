import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data:", formData);

        try {
            const res = await fetch("api/kontakt", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const json = await res.json()
            if (json.success) {
                setSubmitted(true);
            } else {
                alert("Failed to send message: " + (json.error || "Unknown error"));
            }
        } catch (err) {
            alert("Error sending message: " + err.message);
        }
        setSubmitted(true);
    };

    return (
        <div className="container mt-5">
            <h2>Contact Us snart på dansk</h2>

            {submitted ? (
                <div className="alert alert-success">
                    Thanks for contacting us, {formData.name}!
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            className="form-control"
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">Send</button>
                </form>
            )}

            <Link to="/" className="btn btn-link mt-3">Tilbage til start</Link>
        </div>
    );
}
