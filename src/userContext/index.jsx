"use client";

import { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

export const UserProviderWrapper = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  async function getCurrentUserData() {
    try {
      const response = await fetch(`${process.env.DOMAIN}/api/users/user/`);
      const userData = await response.json();
      if (userData.status === 200) {
        setCurrentUser(userData.data);
      }
    } catch (error) {
      throw new Error("Error fetching current user: ", error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getCurrentUserData();
  }, []);

  if (isLoading)
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border m-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};
