"use client";
import { useEffect } from "react";

export default function Logout() {
  async function logoutFun() {
    try {
      // Call the logout API endpoint to log the user out
      await fetch(`${process.env.DOMAIN}/api/users/logout`);
      window.location.href = "/login";
      return null;
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out. Please try again.");
      window.location.back();
      return error;
    }
  }

  useEffect(() => {
    logoutFun();
  }, []);
}
