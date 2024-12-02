import React from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const clearUserData = () => {
  localStorage.removeItem("Users");
};

function Logout() {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      setAuthUser(null); // Clear the authUser state
      clearUserData(); // Remove user data from local storage
      toast.success("Logout successful");
      navigate("/"); // Redirect to home
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
        clearUserData(); // Remove user data from local storage
        toast.success("Account deleted successfully");
        navigate("/"); // Redirect to home or login page
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to delete account");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  // Get email from localStorage (ensure 'Users' contains the email)
  const storedEmail = JSON.parse(localStorage.getItem('Users'))?.email;
  const isAdmin = storedEmail === 'umer.icp.edu@gmail.com';

  return (
    <div className="dropdown dropdown-end">
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
          <a onClick={() => navigate("/profile")}>Profile</a> {/* Navigate to the profile page */}
        </li>
        {isAdmin && (
          <li>
            <button
              onClick={() => navigate("/ProductAdmin")}
              className=""
            >
              Product Admin Panel
            </button>
          </li>
        )}
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
