"use client";

import Link from "next/link";
import { useState } from "react";
import InputField from "../components/InputField";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const inputFields = [
    {
      type: "text",
      placeholder: "First Name",
      name: "firstName",
    },
    {
      type: "text",
      placeholder: "Last Name",
      name: "lastName",
    },
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
    const { firstName, lastName, email, password } = formData;

    if (
      firstName.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      setIsLoading(false);
      setStatus("One of the field is empty");
      return;
    }

    try {
      const response = await fetch(`${process.env.DOMAIN}/api/users/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      const responseData = await response.json();

      if (responseData.error) {
        setIsLoading(false);
        setStatus({ class: "danger", message: await responseData.message });
        return;
      } else {
        setIsLoading(false);
        setStatus({ class: "success", message: await responseData.message });
        router.push("/login?success=true");
      }
    } catch (error) {
      setStatus({ class: "danger", message: error });
    }
  }

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
                    {isLoading ? "Loading..." : "Signup"}
                  </button>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="mb-3">
                  <p className="text-secondary">
                    Already have an account?
                    <Link href="/login" className="text-decoration-none ms-1">
                      Login
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
