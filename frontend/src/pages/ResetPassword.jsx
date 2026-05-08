import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function ResetPassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: localStorage.getItem("resetEmail") || "",
    otp: "",
    new_password: "",
  });

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/reset-password", form);

      alert("Password reset successfully. Please login.");
      localStorage.removeItem("resetEmail");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.detail || "Password reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleResetPassword}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
        <p className="text-gray-500 mb-6">
          Enter OTP and set your new password.
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
          className="w-full border rounded-xl px-4 py-3 mb-4"
          required
        />

        <input
          type="password"
          placeholder="New Password"
          value={form.new_password}
          onChange={(e) =>
            setForm({ ...form, new_password: e.target.value })
          }
          className="w-full border rounded-xl px-4 py-3 mb-6"
          required
        />

        <button className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700">
          Reset Password
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

export default ResetPassword;