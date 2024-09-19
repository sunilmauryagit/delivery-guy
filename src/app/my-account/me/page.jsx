"use client";

import { useContext, useState } from "react";
import { UserContext } from "@/userContext";
import toast from "react-hot-toast";

export default function MyProfile() {
  const { currentUser } = useContext(UserContext);
  const [isActive, setIsActive] = useState(currentUser.isActive);

  const toggleIsActive = (activeStatus) => {
    if (!activeStatus) {
      setIsActive(activeStatus);
      return toast.error("You are now Inactive", { id: currentUser.id });
    } else {
      setIsActive(activeStatus);
      return toast.success("You are now Active", { id: currentUser.id });
    }
  };

  return (
    <>
      <h1>My Profile</h1>
      {currentUser && (
        <div>
          <p>Name: {currentUser.firstName} </p>
          <p>Email: {currentUser.email} </p>
          <p>Username: {currentUser.username} </p>
          <p>
            Active:{" "}
            <span className="form-switch d-inline-block">
              <input
                className="form-check-input cursor-pointer"
                type="checkbox"
                role="switch"
                title={isActive ? "Active" : "Inactive"}
                value={isActive}
                checked={isActive}
                onChange={(e) => toggleIsActive(e.target.checked)}
                id="user-status"
              />
            </span>
          </p>
          <p>Role: {currentUser.role} </p>
        </div>
      )}
    </>
  );
}
