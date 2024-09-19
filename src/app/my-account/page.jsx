"use client";

import { UserContext } from "@/userContext";
import Link from "next/link";
import { useContext } from "react";

export default function MyAccount() {
  const { currentUser } = useContext(UserContext);
  return (
    <>
      <h1>My Account</h1>
      <p>
        Welcome{" "}
        <span className="px-2 border border-1">
          {currentUser && currentUser.firstName}
        </span>
      </p>
      <Link
        href="/my-account/me"
        className="btn btn-primary mb-3 d-inline-block"
      >
        Manage Profile
      </Link>
      <br />
      <Link
        href="/my-account/settings"
        className="btn btn-primary mb-3 d-inline-block"
      >
        Settings
      </Link>
      <br />
    </>
  );
}
