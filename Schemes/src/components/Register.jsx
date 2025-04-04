import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/auth/register", formData, {
        headers: { "Content-Type": "application/json" },
      });

      setUser(data.user);
      toast.success("Registration successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "User already exists!");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Branding Section */}
      <div className="w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
        <h1 className="text-white text-6xl font-bold">Yojak</h1>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Register</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" 
              name="name" 
              placeholder="Full Name" 
              onChange={handleChange} 
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              onChange={handleChange} 
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              onChange={handleChange} 
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:scale-105 transition-transform"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-center">
            Already have an account? 
            <Link to="/login" className="text-blue-600 font-semibold hover:underline ml-1">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
