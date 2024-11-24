import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Logout() {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      setAuthUser(null); // Clear the authUser state
      localStorage.removeItem("Users"); // Remove user data from local storage
      toast.success("Logout successfully");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  const handleDeleteAccount = async () => {
    if (!authUser?.email) {
      toast.error("No user logged in");
      return;
    }

    if (!window.confirm("Are you sure you want to delete your account?")) {
      return; // User canceled
    }

    try {
      const response = await fetch(`http://localhost:4001/user/${authUser.email}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setAuthUser(null); // Clear user state
        localStorage.removeItem("Users"); // Remove user data from local storage
        toast.success("Account deleted successfully");

        setTimeout(() => {
          navigate("/"); // Redirect to home or login page
        }, 2000);
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to delete account");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className="dropdown dropdown-end ">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <img
            alt="User avatar"
            src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.713541997.1730285393&semt=ais_hybrid"
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow dark:bg-slate-950 dark:text-white"
      >
        <li>
          <a>Profile</a>
        </li>
        <li>
          <button
            onClick={() => navigate("/ProductAdmin")}
            className=""
          >
            Product Admin Panel
          </button>
        </li>
        <li>
          <a onClick={handleLogout} className="text-red-500">
            Logout
          </a>
        </li>
        <li>
          <a onClick={handleDeleteAccount} className="text-red-500">
            Delete Account
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Logout;
