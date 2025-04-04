import { useEffect, useState } from "react";
import axios from "axios";
import SchemeForm from "../components/SchemeForm";
import SchemeList from "../components/SchemeList";

const AdminDashboard = () => {
  const [schemes, setSchemes] = useState([]);

  const fetchSchemes = async () => {
    const response = await axios.get("http://localhost:5000/admin/get-schemes");
    setSchemes(response.data);
  };

  useEffect(() => {
    fetchSchemes();
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <SchemeForm refreshSchemes={fetchSchemes} />
      <SchemeList schemes={schemes} refreshSchemes={fetchSchemes} />
    </div>
  );
};

export default AdminDashboard;
