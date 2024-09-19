"use client";
import React, { useEffect } from "react";

export default function Footer() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle");
    }
  }, []);
  return (
    <>
      <div className="container-fluid px-0 bg-black">
        <div className="container py-4">
          <p className="m-0 text-white">&copy; 2024. All rights reserved.</p>
        </div>
      </div>
    </>
  );
}
