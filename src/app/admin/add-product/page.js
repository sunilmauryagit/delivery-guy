"use client";

import Link from "next/link";
import { useState } from "react";
import InputField from "@/app/components/InputField";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    qty: "",
    description: "",
  });

  const inputFields = [
    {
      type: "text",
      placeholder: "Product Title",
      name: "title",
    },
    {
      type: "number",
      placeholder: "Price",
      name: "price",
    },
    {
      type: "number",
      placeholder: "qty",
      name: "qty",
    },
    {
      type: "text",
      placeholder: "Description",
      name: "description",
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
    const { title, price, qty, description } = formData;

    if (title.trim() === "" || price.trim() === "" || qty.trim() === "") {
      setIsLoading(false);
      setStatus("One of the field is empty");
      return;
    }

    try {
      const response = await fetch(`${process.env.DOMAIN}/api/admin/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, price, qty, description }),
      });
      const responseData = await response.json();

      if (responseData.error) {
        setIsLoading(false);
        setStatus({ class: "danger", message: await responseData.message });
        toast.error(responseData.message);
        return;
      } else {
        setIsLoading(false);
        setStatus({ class: "success", message: await responseData.message });
        event.target.reset();
        toast.success(responseData.message);

        return;
      }
    } catch (error) {
      setStatus({ class: "danger", message: error });
      toast.error(error.message);
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
                  field.name === "title" ||
                  field.name === "price" ||
                  field.name === "qty";
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
                    {isLoading ? "Adding..." : "Add"}
                  </button>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="mb-3">
                  <p className="text-secondary">
                    View all products?
                    <Link
                      href="/admin/all-products"
                      className="text-decoration-none ms-1"
                    >
                      All Products
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
