import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6">
      {/* Hero Section */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl font-bold mb-4">Welcome to Yojak</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Your <b>one-stop solution</b> for finding <b>government schemes</b> that match your eligibility.  
          Enter your details and explore schemes tailored just for you!
        </p>
      </motion.div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            title: "All Schemes", 
            desc: "Browse government schemes with ease.", 
            icon: "📜", 
            action: () => navigate("/schemes") 
          },
          { 
            title: "Personalized Match", 
            desc: "Find schemes based on your details.", 
            icon: "🎯", 
            action: () => navigate("/questionnaire") 
          },
          { 
            title: "Easy Access", 
            desc: "Redirects to the official government site.", 
            icon: "🚀", 
            action: () => window.open("https://www.india.gov.in/my-government/schemes", "_blank") 
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white text-gray-900 p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-300 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={feature.action}
          >
            <div className="text-5xl">{feature.icon}</div>
            <h3 className="text-2xl font-semibold mt-4">{feature.title}</h3>
            <p className="mt-2">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Call-to-Action */}
      <motion.button
        onClick={() => navigate("/register")}
        className="mt-10 bg-yellow-400 text-gray-900 py-3 px-8 rounded-lg font-bold text-lg hover:bg-yellow-500 transition duration-300 transform hover:scale-105 shadow-lg"
        whileHover={{ scale: 1.1 }}
      >
        Get Started
      </motion.button>
    </div>
  );
};

export default Dashboard;
