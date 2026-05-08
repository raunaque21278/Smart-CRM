import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function VerifyOTP() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: localStorage.getItem("verifyEmail") || "",
    otp: "",
  });

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/verify-otp", form);

      alert("Account verified successfully. Please login.");
      localStorage.removeItem("verifyEmail");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.detail || "OTP verification failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleVerifyOTP}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-2">Verify OTP</h1>

        <p className="text-gray-500 mb-6">
          Enter the OTP shown after registration.
        </p>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full border rounded-xl px-4 py-3 mb-4"
          required
        />

        <input
          type="text"
          placeholder="Enter OTP"
          value={form.otp}
          onChange={(e) =>
            setForm({ ...form, otp: e.target.value })
          }
          className="w-full border rounded-xl px-4 py-3 mb-6"
          required
        />

        <button className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700">
          Verify OTP
        </button>

        <p className="mt-4 text-sm text-center">
          Back to{" "}
          <Link to="/" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default VerifyOTP;