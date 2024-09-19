"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  const inputFields = [
    {
      type: "email",
      placeholder: "Email",
      name: "email",
    },
    {
      type: "password",
      placeholder: "Password",
      name: "password",
    },
  ];

  // setting form data state value
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setStatus({});
    const { email, password } = formData;

    if (email.trim() === "" || password.trim() === "") {
      setIsLoading(false);
      setStatus("One of the field is empty");
      return;
    }

    try {
      const response = await fetch(`${process.env.DOMAIN}/api/users/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const responseData = await response.json();

      if (responseData.error) {
        setIsLoading(false);
        setStatus({ class: "danger", message: await responseData.message });
        return;
      } else {
        setIsLoading(false);
        setStatus({ class: "success", message: await responseData.message });
        window.location.href = "/my-account/me";
      }
    } catch (error) {
      setStatus({ class: "danger", message: error });
    }
  }

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      toast.success("User created successfully");
      router.replace(`/login`);
    }
  }, [searchParams]);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4 shadow-lg border border-2 p-4 rounded-4">
            <form
              className="row justify-content-between"
              id="myform"
              method="post"
              onSubmit={handleSubmit}
            >
              {inputFields.map((field, i) => {
                const required =
                  field.name === "firstName" ||
                  field.name === "email" ||
                  field.name === "password";
                return (
                  <div className="col-lg-12" key={i}>
                    <InputField
                      type={field.type}
                      placeholder={field.placeholder + (required ? "*" : "")}
                      // label={field.placeholder}
                      name={field.name}
                      onChange={handleInputChange}
                      required={required}
                    />
                  </div>
                );
              })}
              {status && (
                <div className={`col-lg-12 text-${status.class}`}>
                  {status.message}
                </div>
              )}
              <div className="col-lg-12">
                <div className="mb-3">
                  <button
                    type="submit"
                    className={`btn btn-primary w-100 ${
                      isLoading ? "disabled" : ""
                    }`}
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="mb-3">
                  <p className="text-secondary">
                    Don't have an account?
                    <Link href="/signup" className="text-decoration-none ms-1">
                      Signup
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
