import "./Navbar.css";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch, BsCart, BsList, BsX } from "react-icons/bs";
import { useCart } from "../Cart/useCart";

export const Navbar = ({ search, setSearch }) => {
  const { cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/signin");
  };
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 576) {
        setIsAuthOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleAuthMenu = () => {
    setIsAuthOpen(!isAuthOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isAuthOpen) setIsAuthOpen(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
        <div className="container py-1">
          <div className="icon text-uppercase">
            <Link to="/" className="navbar-brand fs-4">
              bloom<span style={{ color: "var(--primary-color)" }}>shop</span>
            </Link>
          </div>

          <div className="search-box mx-auto d-none d-lg-flex justify-content-center align-items-center gap-2 px-3 py-0">
            <BsSearch className="search-icon" />
            <input
              type="text"
              className="form-control border-0 p-1 w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              placeholder=" Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="links d-flex justify-content-between align-items-center gap-2">
            <button
              className="btn d-lg-none border-0 p-1 fs-5"
              onClick={toggleSearch}
              aria-label="Toggle search"
            >
              {isSearchOpen ? <BsX className="fs-3" /> : <BsSearch />}
            </button>

            <Link
              to="/cart"
              state={{
                returnTo: `${location.pathname}${location.search}${location.hash}`,
              }}
              className="nav-link cart px-2 py-2 rounded-circle position-relative"
              aria-label="Cart"
            >
              <BsCart style={{ fontSize: "1.3rem" }} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>

            <button
              className="btn d-sm-none border-0 fs-3 p-0 ms-1"
              onClick={toggleAuthMenu}
              aria-label="Toggle auth links"
            >
              {isAuthOpen ? <BsX /> : <BsList />}
            </button>

            <div className=" d-none d-sm-flex align-items-center gap-2">
              {token ? (
                <>
                  <div
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                    style={{ width: "35px", height: "35px" }}
                  >
                    {userName?.charAt(0).toUpperCase() || "U"}
                  </div>

                  <span className="fw-bold me-2 text-capitalize">
                    {userName || "User"}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-danger px-3 py-1 rounded-pill text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="nav-link signin px-2 py-1 rounded-pill"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="signup nav-link signup rounded-pill px-3 py-1 shadow-sm"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {isSearchOpen && (
            <div className="search-box w-100 d-lg-none d-flex justify-content-center align-items-center gap-2 px-3 py-0 mt-2">
              <BsSearch className="search-icon" />
              <input
                type="text"
                className="form-control border-0 p-1 w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                placeholder=" Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
            </div>
          )}

          {isAuthOpen && (
            <div className="d-sm-none w-100">
              {token ? (
                <div className="d-flex align-items-center justify-content-center mt-2 gap-2">
                  <div
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                    style={{ width: "35px", height: "35px" }}
                  >
                    {userName?.charAt(0).toUpperCase() || "U"}
                  </div>

                  <span className="fw-bold text-capitalize">
                    {userName || "User"}
                  </span>

                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-danger px-3 py-1 rounded-pill"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="nav-link signin px-2 py-1 rounded-pill text-center"
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/signup"
                    className="nav-link signup rounded-pill px-3 py-1 shadow-sm text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
