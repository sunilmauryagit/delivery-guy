"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const router = useRouter();

  // Redirect to my-account/me when the username does not provided in the url
  useEffect(() => {
    router.push("/my-account/me");
  }, []);
  return <></>;
}
