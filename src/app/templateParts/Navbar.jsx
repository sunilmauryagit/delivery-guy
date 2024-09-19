"use client";

import { useContext } from "react";
import Link from "next/link";
import ThemeSwitcher from "../components/misc/ThemeSwitcher";
import SearchForm from "../components/SearchForm";
import { UserContext } from "@/userContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  // Use useContext directly to ensure the component re-renders on context updates
  const { currentUser } = useContext(UserContext);
  const pathname = usePathname();

  // Define the main menu conditionally based on currentUser state
  const mainMenu = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },
    ...(!currentUser
      ? [
          {
            title: "Login",
            href: "/login",
          },
          {
            title: "Signup",
            href: "/signup",
          },
        ]
      : [
          {
            title: "My Account",
            href: "/my-account",
            dowpdownMenu: [
              {
                title: "Profile",
                href: "/my-account/me",
              },
              {
                title: "Logout",
                href: "/logout",
              },
            ],
          },
        ]),
  ];

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          Delivery Guy
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            {mainMenu.map((item, i) => (
              <li
                className="nav-item btn btn-sm p-1 mx-1 dropdown btn-group"
                key={i}
              >
                <Link
                  className={`nav-link ${
                    item.href === pathname ? "active" : ""
                  }`}
                  href={item.href}
                  type="button"
                >
                  {item.title}
                </Link>
                {item.dowpdownMenu && (
                  <>
                    <button
                      className="nav-link dropdown-toggle dropdown-toggle-split"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      aria-current="page"
                      type="button"
                    ></button>
                    <ul className="dropdown-menu">
                      {item.dowpdownMenu.map((child, j) => (
                        <li key={j}>
                          <Link
                            className={`dropdown-item ${
                              child.href === pathname ? "active" : ""
                            } ${child.href === "/logout" ? "text-danger" : ""}`}
                            href={child.href}
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}
          </ul>
          <div>
            <div className="text-black m-0 d-md-flex align-items-center">
              {currentUser && (
                <Link
                  href="/my-account/me"
                  className="me-4 text-decoration-none"
                >
                  Welcome!
                  <span className="border border-1 p-1 rounded-3">
                    {currentUser.username}
                  </span>
                </Link>
              )}
              <Link
                href="/cart"
                className={`me-4 btn btn${
                  pathname !== "/cart" ? "-outline" : ""
                }-secondary position-relative text-decoration-none`}
              >
                <i className="fa fa-shopping-cart"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  0<span class="visually-hidden">Cart Items</span>
                </span>
              </Link>
              {currentUser && (
                <Link href="/orders" className="me-4 text-decoration-none">
                  My Orders
                </Link>
              )}
              <ThemeSwitcher />
            </div>
            <SearchForm />
          </div>
        </div>
      </div>
    </nav>
  );
}
