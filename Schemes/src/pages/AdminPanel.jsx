import { useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    eligibility: "",
    link: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken"); // ✅ Get Admin Token
      const res = await axios.post("http://localhost:5000/schemes/add", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(res.data.message);
    } catch (error) {
      alert("Error adding scheme");
    }
  };

  return (
    <div>
      <h2>Admin Panel - Add Scheme</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Scheme Name" onChange={handleChange} required />
        <textarea name="description" placeholder="Scheme Description" onChange={handleChange} required></textarea>
        <input type="text" name="eligibility" placeholder="Eligibility Criteria" onChange={handleChange} required />
        <input type="text" name="link" placeholder="Official Link" onChange={handleChange} required />
        <button type="submit">Add Scheme</button>
      </form>
    </div>
  );
};

export default AdminPanel;
