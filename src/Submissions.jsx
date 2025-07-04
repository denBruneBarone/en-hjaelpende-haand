import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Submissions() {
    const [submissions, setSubmissions] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchSubmissions() {
            const res = await fetch("/api/submissions");
            console.log("res.status " + res.status)
            if (res.status === 401) {
                // Not authorized, redirect to login
                navigate("/login");
                return;
            }
            if (!res.ok) {
                setError("Failed to fetch submissions");
                return;
            }
            const data = await res.json();
            setSubmissions(data);
        }
        fetchSubmissions();
    }, [navigate]);

    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!submissions) return <div>Loading submissions...</div>;

    return (
        <div className="container mt-5">
            <h2>Contact Form Submissions</h2>
            {submissions.length === 0 ? (
                <p>No submissions yet.</p>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((sub, i) => (
                            <tr key={i}>
                                <td>{new Date(sub.timestamp).toLocaleString()}</td>
                                <td>{sub.name}</td>
                                <td>{sub.email}</td>
                                <td>{sub.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
