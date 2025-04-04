import { useEffect, useState } from "react";
import axios from "axios";

const PersonalizedSchemes = () => {
    const [schemes, setSchemes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSchemes = async () => {
            try {
                const response = await axios.post("http://localhost:5000/schemes/personalized", {
                    gender: "Male",
                    caste: "General",
                    education: "Class 12",
                    annualIncome: 200000,
                    disability: "No",
                    employmentType: "Student",
                    state: "Uttar Pradesh"
                });

                // ✅ Ensure `schemes` is always an array
                setSchemes(response.data.schemes || []);
            } catch (err) {
                console.error("❌ Error fetching schemes:", err);
                setError("Failed to fetch schemes. Please try again.");
            }
        };

        fetchSchemes();
    }, []);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div>
            <h2>Personalized Schemes</h2>
            {schemes.length === 0 ? (
                <p>No schemes found for your criteria.</p>
            ) : (
                <ul>
                    {schemes.map((scheme) => (
                        <li key={scheme._id}>
                            <h3>{scheme.name}</h3>
                            <p>{scheme.description}</p>
                            <a href={scheme.officialLink} target="_blank" rel="noopener noreferrer">Official Link</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PersonalizedSchemes;
