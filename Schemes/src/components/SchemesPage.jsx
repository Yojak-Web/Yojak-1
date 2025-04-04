import React, { useState, useEffect } from "react";

const SchemesPage = () => {
    const [schemes, setSchemes] = useState([]);
    const [selectedScheme, setSelectedScheme] = useState(null);
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ✅ Fetch all schemes when the component loads
    useEffect(() => {
        const fetchSchemes = async () => {
            try {
                const response = await fetch("/api/schemes");
                if (!response.ok) throw new Error("Failed to fetch schemes");
                const data = await response.json();
                setSchemes(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchSchemes();
    }, []);

    // ✅ Fetch summary of a selected scheme
    const fetchSummary = async (schemeId) => {
        setLoading(true);
        setSummary("");
        setError("");
        try {
            const response = await fetch(`/api/schemes/${schemeId}/summary`);
            if (!response.ok) throw new Error("Failed to fetch summary");
            const data = await response.json();
            setSummary(data.summary);
            setSelectedScheme(schemeId);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Available Government Schemes</h1>

            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {schemes.map((scheme) => (
                    <div key={scheme._id} className="p-4 border rounded-lg shadow-md bg-white">
                        <h2 className="text-xl font-semibold">{scheme.name}</h2>
                        <p className="text-gray-600">{scheme.description.slice(0, 100)}...</p>
                        <button
                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md"
                            onClick={() => fetchSummary(scheme._id)}
                        >
                            View Summary
                        </button>
                    </div>
                ))}
            </div>

            {/* Summary Section */}
            {selectedScheme && (
                <div className="mt-6 p-4 border rounded-lg bg-gray-100">
                    <h2 className="text-2xl font-semibold">Scheme Summary</h2>
                    {loading ? <p>Loading summary...</p> : <p>{summary}</p>}
                </div>
            )}
        </div>
    );
};

export default SchemesPage;
