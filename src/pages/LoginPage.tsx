import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost/intro-section-backend/api.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: 'login',
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const text = await response.text();
      console.log("Raw response text:", text);

      const data = JSON.parse(text);
      if (data.success) {
        localStorage.setItem('user_id', data.user_id);
        navigate('/dashboard');
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-almost-white px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-almost-black mb-6 text-center">
          Welcome Back
        </h2>
        {error && (
          <div className="text-red-500 text-sm mb-4">
            {error}
          </div>
        )}
        <form
          action="login.php"
          method="POST"
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm text-medium-gray mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="johndoe@example.com"
              required
              className="w-full p-3 border border-medium-gray rounded-lg focus:outline-none focus:border-almost-black"
            />
          </div>

          <div>
            <label className="block text-sm text-medium-gray mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full p-3 border border-medium-gray rounded-lg focus:outline-none focus:border-almost-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-almost-black text-white py-3 rounded-xl hover:bg-white hover:text-almost-black border border-almost-black transition-colors duration-300 ease-in-out"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-medium-gray mt-6">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-almost-black font-medium hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
