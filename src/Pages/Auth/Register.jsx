// Register.jsx
// BLOOMSHOP - Register Component
// Uses react-hook-form + yup for validation, Bootstrap 5 for layout,
// and localStorage to simulate account creation (no backend API).

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";

// ---- Validation Schema ----
const registerSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required("Full name is required"),
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
  });

  // ---- Submit Handler ----
  const onSubmit = (data) => {
    // NOTE: No backend — we simulate account creation via localStorage.
    // In a real app, never store plain-text passwords client-side.
    const userToStore = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    };

    localStorage.setItem("user", JSON.stringify(userToStore));

    // Redirect the new user to the login page
  navigate("/signin");
  };

  return (
    <div className="auth-page d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-7 col-lg-5">
            <div className="auth-card">
              <h1 className="auth-brand text-center">BLOOMSHOP</h1>
              <p className="auth-subtitle text-center mb-4">
                Create your account
              </p>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Full Name */}
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    className={`form-control auth-input ${
                      errors.fullName ? "is-invalid" : ""
                    }`}
                    placeholder="Jane Doe"
                    {...register("fullName")}
                  />
                  {errors.fullName && (
                    <div className="invalid-feedback">
                      {errors.fullName.message}
                    </div>
                  )}
                </div>

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
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className={`form-control auth-input ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    placeholder="At least 8 characters"
                    {...register("password")}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password.message}
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className={`form-control auth-input ${
                      errors.confirmPassword ? "is-invalid" : ""
                    }`}
                    placeholder="Re-enter your password"
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword.message}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-auth-primary w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
                </button>
              </form>

              <p className="text-center mt-4 auth-switch-text">
                Already have an account? <Link to="/signin">Log in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;