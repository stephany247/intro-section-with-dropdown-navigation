import React, { useState } from "react";
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
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) => (
  <div>
    <label className="block text-sm text-medium-gray mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full h-10 p-3 border border-medium-gray rounded-lg focus:outline-none focus:border-almost-black"
    />
  </div>
);

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Form Data:", formData);
  };

  return (
    <main className="min-h-screen flex items-center m-auto bg-[url('../assets/images/image-hero-mobile.png')] bg-cover bg-center">
      <div className="flex flex-col md:flex-row items-center justify-center bg-almost-white shadow-2xl rounded-2xl p-4 md:gap-10 w-full max-w-3xl md:m-auto">
        <img src={heroImage} alt="Snap Logo" className="w-1/2 opacity-90 hidden md:block" />
        <img src={logo} alt="Snap Logo" className="mt-8 md:hidden" />
        <div className="bg-almost-white p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-almost-black mb-6 text-center">
            Create your account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              label="Full Name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
            <InputField
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="johndoe@example.com"
              required
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
            <button
              type="submit"
              className="w-full bg-almost-black text-white py-3 rounded-xl hover:bg-white hover:text-almost-black border border-almost-black transition-colors duration-300 ease-in-out"
            >
              Register
            </button>
          </form>
          <p className="text-center text-sm text-medium-gray mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-almost-black font-medium hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default RegistrationPage;
