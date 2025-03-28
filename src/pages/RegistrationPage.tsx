import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/images/image-hero-desktop.png";
import logo from "../assets/images/logo.svg";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
}) => (
  <div>
    <label className="block text-sm text-medium-gray mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full h-10 p-3 border border-medium-gray rounded-lg focus:outline-none focus:border-almost-black"
    />
    <div className="min-h-[1rem] mt-1">
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  </div>
);

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let valid = true;
    let errors = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.fullName) {
      errors.fullName = "Full Name is required";
      valid = false;
    }

    if (!formData.email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
      valid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      valid = false;
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('http://localhost/intro-section-backend/api.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'register',
            name: formData.fullName,
            email: formData.email,
            password: formData.password
          })
        });
        const text = await response.text();
        console.log("Raw response text:", text);

        const data = JSON.parse(text);
        console.log(data);
        if (data.message === "User registered successfully") {
          localStorage.setItem('user_id', data.user_id);
          navigate('/profile');
        } else {
          setServerError(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        setServerError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center m-auto bg-almost-white ">
      <div className="flex flex-col md:flex-row items-center justify-center bg-white shadow-2xl rounded-2xl p-4 md:gap-10 w-full max-w-3xl md:mx-auto md:my-12">
        <img src={heroImage} alt="Snap Logo" className="w-1/2 h-full opacity-90 hidden md:block" />
        <img src={logo} alt="Snap Logo" className="mt-8 md:hidden" />
        <div className="w-full p-4 max-w-md rounded-2xl">
          <h2 className="text-2xl font-bold text-almost-black mb-6 text-center">
            Create your account
          </h2>
          {serverError && (
            <div className="text-red-500 text-sm mb-4">
              {serverError}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-0">
            <InputField
              label="Full Name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              required
              error={errors.fullName}
            />
            <InputField
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="johndoe@example.com"
              required
              error={errors.email}
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              error={errors.password}
            />
            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
              error={errors.confirmPassword}
            />
            <button
              type="submit"
              className="w-full bg-almost-black text-white py-3 rounded-xl mt-2 hover:bg-white hover:text-almost-black border border-almost-black transition-colors duration-300 ease-in-out"
            >
              Register
            </button>
          </form>
          <p className="text-center text-sm text-medium-gray mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-almost-black font-medium underline"
            >
              Login
            </a>
          </p>
          <p className="text-center text-sm text-medium-gray mt-2">
            Back to Home?{" "}
            <a
              href="/"
              className="text-almost-black font-medium underline"
            >
              Home
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default RegistrationPage;
