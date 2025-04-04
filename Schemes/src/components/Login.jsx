import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/auth/login", formData, {
        headers: { "Content-Type": "application/json" },
      });

      setUser(data.user);
      toast.success("Login successful!");
      navigate("/questionnaire");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex h-screen">
     
      <div className="w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
       <img className="h-80" src="./src/assets/Vista Logos/logo-transparent-png.png"></img>
      </div>

     
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              Login
            </button>
          </form>

          <p className="mt-4 text-center">
            New user? 
            <Link to="/register" className="text-blue-600 font-semibold hover:underline ml-1">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
