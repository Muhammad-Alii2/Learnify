import UserAccountNav from "../components/UserAccountNav";
import SignInButton from "../components/SignInButton";
import "../styles/fonts.module.css";
import React from "react";
import Link from "next/link";
import { getAuthSession } from "@/lib/auth";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <nav className="navbar navbar-expand-lg bg-black">
      <div className="container-fluid">
        <Link
          className="fs-1 lh-1 navbar-brand text-light btn btn-outline-warning"
          href="/"
          style={{ fontFamily: "angrybird", fontSize: "25px" }}
        >
          {" "}
          Learnify
        </Link>
        <button
          className="navbar-toggler bg-dark"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          {/* Here is the user drop-down */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle btn btn-secondary text-light font-monospace fw-bold"
                href=""
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                user
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item bg-dark">
                    {session?.user ? (
                      <UserAccountNav user={session.user} />
                    ) : (
                      <SignInButton />
                    )}
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link btn btn-secondary text-light font-monospace fw-bold"
                href="/gallery"
              >
                Gallery
              </Link>
            </li>

            {/* Here we are using this session function so that user can only create the course when he is signed in  */}
            {session?.user && (
              <li className="nav-item">
                <Link
                  className="nav-link text-light btn btn-secondary font-monospace fw-bold"
                  href="/create"
                >
                  Create Course
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link
                className="nav-link text-light btn btn-secondary font-monospace fw-bold"
                href="/settings"
              >
                About-us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
