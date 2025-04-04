import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SchemeDetails = () => {
    const { id } = useParams();
    const [scheme, setScheme] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchScheme = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/schemes/${id}/summary`);
                setScheme(response.data);
            } catch (err) {
                console.error("❌ Error fetching scheme:", err);
                setError(err.response?.data?.error || "Failed to load scheme.");
            } finally {
                setLoading(false);
            }
        };
        fetchScheme();
    }, [id]);

    if (loading) return <div className="loader">Loading scheme...</div>;
    if (error) return <p className="error-message text-red-500">{error}</p>;
    if (!scheme) return <p className="text-gray-500">No scheme found.</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{scheme.name || "Unknown Scheme"}</h2>
            
            <p className="mb-2"><strong>Description:</strong> {scheme.description || "No description available."}</p>
            <p className="mb-2"><strong>Eligibility:</strong> {scheme.eligibility || "Not specified."}</p>
            <p className="mb-2"><strong>Benefits:</strong> {scheme.benefits || "Not mentioned."}</p>
            <p className="mb-2"><strong>AI Summary:</strong> {scheme.summary || "No AI-generated summary available."}</p>

            {scheme.officialLink && (
                <a href={scheme.officialLink} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 underline">
                   🔗 Official Link
                </a>
            )}
        </div>
    );
};

export default SchemeDetails;
