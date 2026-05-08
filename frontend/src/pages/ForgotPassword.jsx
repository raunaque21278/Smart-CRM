import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/forgot-password", {
        email,
      });

      alert(`OTP for password reset: ${res.data.otp_for_testing}`);

      localStorage.setItem("resetEmail", email);
      navigate("/reset-password");
    } catch (error) {
      alert(error.response?.data?.detail || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleForgotPassword}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
        <p className="text-gray-500 mb-6">
          Enter your registered email to get reset OTP.
        </p>

        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 mb-6"
          required
        />

        <button className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700">
          Get OTP
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

export default ForgotPassword;