"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AllProducts() {
  const [products, setProducts] = useState(null);
  async function AllProducts() {
    const response = await fetch(`${process.env.DOMAIN}/api/admin/product`, {
      method: "GET",
    });
    const data = await response.json();
    if (data.status === 200) {
      setProducts(data.data);
    }
  }

  useEffect(() => {
    AllProducts();
  }, []);

  if (!products) return null;

  async function handleDelete(id) {
    const isDelete = confirm("Are you sure you want to delete this product");
    console.log(isDelete);
    if (isDelete === false) return;

    try {
      const response = await fetch(`${process.env.DOMAIN}/api/admin/product`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      if (response.status === 200) {
        const updatedProducts = products.filter(
          (product) => product._id !== id
        );
        setProducts(updatedProducts);
        toast.success("Product deleted successfully");
      } else {
        toast.error(response.status + ": " + response.message);
      }
    } catch (error) {
      toast.error("Error deleting product: " + error.message);
    }
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-8 shadow-lg border border-2 p-4 rounded-4">
            <h1 className="text-center">All Products</h1>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {products &&
                  products.map((product, index) => (
                    <tr key={product._id} id={product._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{product.title}</td>
                      <td>{product.price}</td>
                      <td>{product.qty}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="my-3">
              <p className="text-secondary">
                <Link
                  href="/admin/add-product"
                  className="text-decoration-none ms-1"
                >
                  Add New
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
