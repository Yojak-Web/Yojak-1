import { useEffect, useState } from "react";
import axios from "axios";

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/schemes/all");
        setSchemes(data);
      } catch (error) {
        console.error("Error fetching schemes:", error);
      }
    };

    fetchSchemes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Government Schemes</h1>

        {schemes.length === 0 ? (
          <p className="text-center text-gray-600">No schemes available.</p>
        ) : (
          schemes.map((scheme) => (
            <div key={scheme._id} className="mb-6 p-4 border rounded-lg shadow-sm bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-700">{scheme.name}</h2>
              <p className="text-gray-600 mt-2">{scheme.description}</p>
              <a
                href={scheme.officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium hover:underline mt-2 inline-block"
              >
                Visit Official Site
              </a>
              <div className="mt-3 p-3 bg-gray-200 rounded">
                <h3 className="font-semibold text-gray-700">Simplified Details:</h3>
                <p className="text-gray-600">{scheme.simplifiedDetails}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Schemes;
