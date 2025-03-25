import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const userId = localStorage.getItem('user_id');
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost/intro-section-backend/getUser.php?user_id=${userId}`)
        .then((res: { data: any }) => {
          setUser(res.data);
        })
        .catch((err: any) => console.error(err));
    }
  }, [userId]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        {/* <div className="flex items-center justify-center mb-6">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
        </div> */}
        <h2 className="text-2xl font-bold text-center mb-4">Profile</h2>
        <div className="mb-4">
          <p className="text-gray-700"><strong>Name:</strong> {user.name}</p>
          <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
          <p className="text-gray-700"><strong>Username:</strong> {user.username}</p>
        </div>
        <button
          onClick={() => navigate('/edit-profile')}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
