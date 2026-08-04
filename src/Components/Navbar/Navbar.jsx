import "./Navbar.css";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { BsCart } from "react-icons/bs";

export const Navbar = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
        <div className="container  py-1 ">
            <div className="icon text-uppercase">
                <Link to="/" className="navbar-brand fs-4 ">
                bloom<span style={{ color: "var(--primary-color)" }}>shop</span>
                </Link>
            </div>
            <div className="search-box mx-auto d-flex justify-content-center align-items-center gap-2 px-3  py-0">
                <BsSearch className="search-icon" />
                <input
                type="text"
                className="form-control border-0 p-1 w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                placeholder=" Search products..."
                />
            </div>
            <div className="links d-flex justify-content-between align-items-center gap-2 ">
                <Link to="/cart" className="nav-link cart px-2 py-2 rounded-circle">
                <BsCart style={{ fontSize: "1.1rem" }} />
                </Link>

                <Link
                to="/signin"
                className="nav-link signin px-2 py-1 rounded-pill"
                >
                Sign In
                </Link>

                <Link
                to="/signup"
                className="nav-link signup rounded-pill px-3 py-1 shadow-sm"
                >
                Sign Up
                </Link>
            </div>
        </div>
    </nav>
    </>
  );
};
