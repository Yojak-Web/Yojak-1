import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Questionnaire = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    caste: "",
    education: "",
    annualIncome: "",
    gender: "",
    maritalStatus: "",
    disability: "",
    employmentType: "",
    occupation: "",
    state: "",
    district: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userDetails", JSON.stringify(formData));
    toast.success("Details submitted successfully!");
    navigate("/personalized-schemes"); // Redirect to the personalized schemes page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-10">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-5xl">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Fill Your Details
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          
          {/* Left Column */}
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your full name"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              required
              placeholder="Enter your age"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              min="0"
            />
          </div>

          <div>
            <label className="block text-gray-700">Caste</label>
            <select name="caste" required onChange={handleChange} className="w-full p-2 border rounded">
              <option value="">Select Caste</option>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Educational Qualification</label>
            <select name="education" required onChange={handleChange} className="w-full p-2 border rounded">
              <option value="">Select Education</option>
              <option value="8th">8th</option>
              <option value="9th">9th</option>
              <option value="10th">10th</option>
              <option value="12th">12th</option>
              <option value="Diploma">Diploma</option>
              <option value="Graduate">Graduate</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Annual Income (₹)</label>
            <input
              type="number"
              name="annualIncome"
              required
              placeholder="Enter Annual Income"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              min="0"
            />
          </div>

          <div>
            <label className="block text-gray-700">Gender</label>
            <select name="gender" required onChange={handleChange} className="w-full p-2 border rounded">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Right Column */}
          <div>
            <label className="block text-gray-700">Marital Status</label>
            <select name="maritalStatus" required onChange={handleChange} className="w-full p-2 border rounded">
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Widowed">Widowed</option>
              <option value="Divorced">Divorced</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Do you have a disability?</label>
            <select name="disability" required onChange={handleChange} className="w-full p-2 border rounded">
              <option value="">Select Option</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Employment Type</label>
            <select name="employmentType" required onChange={handleChange} className="w-full p-2 border rounded">
              <option value="">Select Employment Type</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="Private Job">Private Job</option>
              <option value="Government Job">Government Job</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Occupation</label>
            <input
              type="text"
              name="occupation"
              placeholder="Enter your occupation"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700">State</label>
            <input
              type="text"
              name="state"
              required
              placeholder="Enter your state"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700">District</label>
            <input
              type="text"
              name="district"
              required
              placeholder="Enter your district"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Submit Button (Full Width) */}
          <div className="col-span-2">
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300">
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Questionnaire;
