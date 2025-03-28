import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditProfile() {
  const [user, setUser] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      axios
        .get(
          `http://localhost/intro-section-backend/getUser.php?user_id=${userId}`
        )
        .then((res: { data: any }) => {
          setUser(res.data);
        })
        .catch((err: any) => console.error(err));
    }
  }, [userId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpdateProfile = async () => {
    if (!userId) return;

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("username", user.username);

    if (selectedFile) {
      formData.append("profile_pic", selectedFile); // Keep the input name as `profile_pic`
    }

    try {
      const res = await axios.post(
        "http://localhost/intro-section-backend/updateProfile.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.image) {
        setUser({ ...user, image: res.data.image }); // Update the `image` field in the state
      }
      alert("Profile updated successfully!");
      navigate("/profile"); // Redirect to the profile page
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="shadow-2xl rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Edit Profile</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            id="name"
            placeholder="Full name"
            type="text"
            value={user.name || ""}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            id="email"
            placeholder="Email address"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Username
          </label>
          <input
            id="name"
            placeholder="Full name"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="profilePic"
            className="block text-gray-700 font-medium mb-2"
          >
            Profile Picture
          </label>
          <input
            id="profilePic"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            title="Choose a profile picture"
            placeholder="Upload your profile picture"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:text-blue-600 hover:file:bg-blue-100 transition-colors duration-200 ease-in-out"
          />
        </div>
        <button
          onClick={handleUpdateProfile}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}
