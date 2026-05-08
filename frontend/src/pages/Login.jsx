import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "admin@example.com",
    password: "123456",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user_name", res.data.user.name);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.detail || "Invalid login"
      );
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-100">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 text-white items-center justify-center p-12">
        <div>
          <h1 className="text-5xl font-bold mb-6">
            SmartCRM
          </h1>

          <p className="text-xl max-w-md">
            Manage leads, deals, contacts and support tickets.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
        >
          <h2 className="text-3xl font-bold mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-500 mb-6">
            Login to your CRM dashboard
          </p>

          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3 mb-4"
          />

          <label className="block mb-2 font-medium">
            Password
          </label>

          <input
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3 mb-6"
          />

          <button className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition">
            Login
          </button>

          <div className="flex justify-between mt-5 text-sm">
            <Link
              to="/register"
              className="text-indigo-600 hover:underline"
            >
              Create Account
            </Link>

            <Link
              to="/forgot-password"
              className="text-red-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;