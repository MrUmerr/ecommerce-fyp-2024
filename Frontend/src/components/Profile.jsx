import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const [updatedUser, setUpdatedUser] = useState({
    fullname: authUser?.fullname || "",
    email: authUser?.email || "",
    password: "",
  });

  useEffect(() => {
    if (!authUser) {
      // Redirect to home if no user is logged in
      navigate("/");
    }
  }, [authUser, navigate]);

  const handleProfileUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:4001/user/${authUser.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: updatedUser.fullname,
          newEmail: updatedUser.email,
          password: updatedUser.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAuthUser(data.user); // Update profile details
        localStorage.setItem("Users", JSON.stringify(data.user)); // Save updated user in localStorage
        toast.success("Profile updated successfully");
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  // Back to Home button handler
  const handleBackToHome = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg dark:bg-slate-900">
      <h2 className="text-2xl font-semibold text-center mb-6 ">User Profile</h2>
      
      <div className="space-y-4">
        <input
          type="text"
          value={updatedUser.fullname}
          onChange={(e) => setUpdatedUser({ ...updatedUser, fullname: e.target.value })}
          placeholder="Full Name"
          className="input input-bordered w-full py-2 px-4 rounded-md border-gray-300 focus:ring-2 focus:ring-white focus:outline-none text-black dark:bg-slate-950 dark:text-white "
        />
        <input
          type="email"
          value={updatedUser.email}
          onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
          placeholder="Email"
          className="input input-bordered w-full py-2 px-4 rounded-md border-gray-300 focus:ring-2 focus:ring-white focus:outline-none text-black dark:bg-slate-950 dark:text-white"
        />
        <input
          type="password"
          value={updatedUser.password}
          onChange={(e) => setUpdatedUser({ ...updatedUser, password: e.target.value })}
          placeholder="New Password"
          className="input input-bordered w-full py-2 px-4 rounded-md border-gray-300 focus:ring-2 focus:ring-white focus:outline-none text-black dark:bg-slate-950 dark:text-white"
        />
      </div>

      <div className="mt-6 flex justify-between gap-4 flex-col sm:flex-row">
        <button
          onClick={handleProfileUpdate}
          className=" w-full sm:w-auto py-2 px-6 rounded-md text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Save
        </button>
        <button
          onClick={handleBackToHome}
          className="w-full sm:w-auto py-2 px-6 rounded-md bg-gray-400 text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Profile;
