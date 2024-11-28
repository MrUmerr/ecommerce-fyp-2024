// import React, { useState } from "react";
// import { useAuth } from "../context/AuthProvider";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// // Utility function for clearing local storage
// const clearUserData = () => {
//   localStorage.removeItem("Users");
// };

// function Logout() {
//   const [authUser, setAuthUser] = useAuth();
//   const navigate = useNavigate();

//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [updatedUser, setUpdatedUser] = useState({
//     fullname: authUser?.fullname || "",
//     email: authUser?.email || "",
//     password: "",
//   });

//   const handleLogout = () => {
//     try {
//       setAuthUser(null); // Clear the authUser state
//       clearUserData(); // Remove user data from local storage
//       toast.success("Logout successful");
//       navigate("/"); // Redirect to home
//     } catch (error) {
//       toast.error("Error: " + error.message);
//     }
//   };

//   const handleDeleteAccount = async () => {
//     if (!authUser?.email) {
//       toast.error("No user logged in");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to delete your account?")) {
//       return; // User canceled
//     }

//     try {
//       const response = await fetch(`http://localhost:4001/user/${authUser.email}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//       });

//       if (response.ok) {
//         setAuthUser(null); // Clear user state
//         clearUserData(); // Remove user data from local storage
//         toast.success("Account deleted successfully");
//         navigate("/"); // Redirect to home or login page
//       } else {
//         const data = await response.json();
//         toast.error(data.message || "Failed to delete account");
//       }
//     } catch (error) {
//       toast.error("Error: " + error.message);
//     }
//   };

//   const handleProfileUpdate = async () => {
//     try {
//       const response = await fetch(`http://localhost:4001/user/${authUser.email}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           fullname: updatedUser.fullname,
//           newEmail: updatedUser.email,  // Sending newEmail instead of email
//           password: updatedUser.password,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setAuthUser(data.user); // Update authUser state
//         localStorage.setItem("Users", JSON.stringify(data.user)); // Save updated user in localStorage
//         toast.success("Profile updated successfully");
//         setShowProfileModal(false); // Close the modal after successful update
//       } else {
//         const data = await response.json();
//         toast.error(data.message || "Failed to update profile");
//       }
//     } catch (error) {
//       toast.error("Error: " + error.message);
//     }
//   };

//   return (
//     <div className="dropdown dropdown-end">
//       <div
//         tabIndex={0}
//         role="button"
//         className="btn btn-ghost btn-circle avatar"
//       >
//         <div className="w-10 rounded-full">
//           <img
//             alt="User avatar"
//             src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.713541997.1730285393&semt=ais_hybrid"
//           />
//         </div>
//       </div>
//       <ul
//         tabIndex={0}
//         className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow dark:bg-slate-950 dark:text-white"
//       >
//         <li>
//           <a onClick={() => setShowProfileModal(true)}>Profile</a>
//         </li>
//         <li>
//           <button
//             onClick={() => navigate("/ProductAdmin")}
//             className=""
//           >
//             Product Admin Panel
//           </button>
//         </li>
//         <li>
//           <a onClick={handleLogout} className="text-red-500">
//             Logout
//           </a>
//         </li>
//         <li>
//           <a onClick={handleDeleteAccount} className="text-red-500">
//             Delete Account
//           </a>
//         </li>
//       </ul>

//       {/* Profile Modal */}
//       {showProfileModal && (
//         <div className="modal modal-open">
//           <div className="modal-box">
//             <h2 className="text-lg font-bold">Update Profile</h2>
//             <input
//               type="text"
//               value={updatedUser.fullname}
//               onChange={(e) =>
//                 setUpdatedUser({ ...updatedUser, fullname: e.target.value })
//               }
//               placeholder="Full Name"
//               className="input input-bordered w-full mt-2"
//             />
//             <input
//               type="email"
//               value={updatedUser.email}
//               onChange={(e) =>
//                 setUpdatedUser({ ...updatedUser, email: e.target.value })
//               }
//               placeholder="Email"
//               className="input input-bordered w-full mt-2"
//             />
//             <input
//               type="password"
//               value={updatedUser.password}
//               onChange={(e) =>
//                 setUpdatedUser({ ...updatedUser, password: e.target.value })
//               }
//               placeholder="New Password"
//               className="input input-bordered w-full mt-2"
//             />
//             <div className="modal-action">
//               <button onClick={handleProfileUpdate} className="btn btn-primary">
//                 Save
//               </button>
//               <button
//                 onClick={() => setShowProfileModal(false)}
//                 className="btn btn-secondary"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Logout;





// Logout.js
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
