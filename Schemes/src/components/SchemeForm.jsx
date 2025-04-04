import { useState } from "react";
import axios from "axios";

const SchemeForm = ({ refreshSchemes }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    caste: "",
    education: "",
    annualIncome: "",
    gender: "",
    officialLink: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/admin/add-scheme", formData);
    refreshSchemes();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Add Scheme</h3>
      <input type="text" name="name" placeholder="Scheme Name" onChange={handleChange} required className="border p-2 w-full mb-2"/>
      <input type="text" name="description" placeholder="Description" onChange={handleChange} required className="border p-2 w-full mb-2"/>
      <input type="text" name="caste" placeholder="Caste" onChange={handleChange} required className="border p-2 w-full mb-2"/>
      <input type="text" name="education" placeholder="Education" onChange={handleChange} required className="border p-2 w-full mb-2"/>
      <input type="number" name="annualIncome" placeholder="Annual Income" onChange={handleChange} required className="border p-2 w-full mb-2"/>
      <input type="text" name="gender" placeholder="Gender" onChange={handleChange} required className="border p-2 w-full mb-2"/>
      <input type="url" name="officialLink" placeholder="Official Link" onChange={handleChange} required className="border p-2 w-full mb-2"/>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Scheme</button>
    </form>
  );
};

export default SchemeForm;
