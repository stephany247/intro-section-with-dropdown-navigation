import React from "react";
import { useNavigate } from "react-router-dom";
import Planning from "../components/Planning";
import Calendar from "../components//Calendar"; // Assuming you have a Calendar component
import Reminders from "../components//Reminders"; // Assuming you have a Reminders component
import TodoList from "../components//TodoList"; // Assuming you have a TodoList component
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();

  if (!userId) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">To-Do List</h2>
            <TodoList userId={userId} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">Calendar</h2>
            <Calendar userId={userId} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">Reminders</h2>
            {/* <Reminders userId={userId} events={[]} /> */}
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">Planning</h2>
            {/* <Planning userId={userId} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
