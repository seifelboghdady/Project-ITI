// Login.jsx
// BLOOMSHOP - Login Component
// Uses react-hook-form + yup for validation, Bootstrap 5 for layout,
// and localStorage to simulate authentication (no backend API).

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";

// ---- Validation Schema ----
const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  // ---- Submit Handler ----
  const onSubmit = (data) => {
    setLoginError(""); // reset any previous error

    // NOTE: No backend — we simulate auth by checking the single
    // "registered" user saved in localStorage during Register.
    const storedUserRaw = localStorage.getItem("user");

    if (!storedUserRaw) {
      setLoginError("No account found. Please sign up first.");
      return;
    }

    const storedUser = JSON.parse(storedUserRaw);

    const emailMatches =
      storedUser.email.toLowerCase() === data.email.toLowerCase();
    const passwordMatches = storedUser.password === data.password;

    if (emailMatches && passwordMatches) {
      // Simulate a successful login by storing a dummy token
      localStorage.setItem("token", "dummy-auth-token-123");
      
     // Attempts to get the name; falls back to the first part of the email if not found      const displayName = storedUser.name || storedUser.fullName || data.email.split('@')[0];
      localStorage.setItem("userName", displayName);

      navigate("/"); // or navigate("/checkout") depending on your flow
    } else {
      setLoginError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="auth-page d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-7 col-lg-5">
            <div className="auth-card">
              <h1 className="auth-brand text-center">BLOOMSHOP</h1>
              <p className="auth-subtitle text-center mb-4">
                Welcome back, log in below
              </p>

              {/* Simple error state shown when credentials don't match */}
              {loginError && (
                <div className="alert auth-alert" role="alert">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`form-control auth-input ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    placeholder="jane@example.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className={`form-control auth-input ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    placeholder="Your password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password.message}
                    </div>
                  )}
                </div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Logging In..." : "Login"}
              </button>
              </form>

              <p className="text-center mt-4 auth-switch-text">
                Don&apos;t have an account? <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;