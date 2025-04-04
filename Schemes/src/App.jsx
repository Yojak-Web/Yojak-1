import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar"; 
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Schemes from "./components/Schemes";
import Questionnaire from "./components/Questionnaire";
import PersonalizedSchemes from "./components/PersonalizedSchemes";
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./pages/AdminPanel";

import "./index.css";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar /> 
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/schemes" element={<Schemes />} />
        <Route path="/questionnaire" element={<Questionnaire />} /> 
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin-panel" element={<AdminPanel />} /> 
        <Route path="/personalized-schemes" element={<PersonalizedSchemes />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>

     
     
    </Router>
  );
}

export default App;
