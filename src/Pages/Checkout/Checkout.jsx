// Checkout.jsx
// BLOOMSHOP - Checkout Component
// Protected route: requires a "token" in localStorage (set during Login).
// Uses react-hook-form + yup for validation, Bootstrap 5 for layout.

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "./checkout.css";
import { useCart } from "../../Components/Cart/useCart";

// ---- Validation Schema ----
const checkoutSchema = yup.object({
  fullName: yup.string().trim().required("Full name is required"),
  address: yup.string().trim().required("Shipping address is required"),
  city: yup.string().trim().required("City is required"),
  phone: yup
    .string()
    .trim()
    .required("Phone number is required")
    // Accepts optional leading + and 8-15 digits — adjust to your locale's format if needed
    .matches(/^\+?[0-9]{8,15}$/, "Please enter a valid phone number"),
  paymentMethod: yup
    .string()
    .oneOf(["cod", "card"], "Please select a payment method")
    .required("Please select a payment method"),
});

const Checkout = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  // ---- Route Protection ----
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      phone: "",
      paymentMethod: "cod", // default payment method: Cash on Delivery
    },
    mode: "onBlur",
  });

  // ---- Submit Handler ----
  const onSubmit = (data) => {
    // NOTE: No backend — we simulate placing an order.
    // In a real app this would POST to an orders API.
    const order = {
      ...data,
      placedAt: new Date().toISOString(),
    };
    localStorage.setItem("lastOrder", JSON.stringify(order));

    // السطر الجديد اللي هيفضي السلة
    clearCart(); 

    navigate("/thankyou");
  };

    

  return (
    <div className="checkout-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-7">
            <div className="checkout-card">
              <h1 className="checkout-title">Checkout</h1>
              <p className="checkout-subtitle mb-4">
                Enter your shipping details to place your order
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
                    className={`form-control checkout-input ${
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

                {/* Shipping Address */}
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Shipping Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    className={`form-control checkout-input ${
                      errors.address ? "is-invalid" : ""
                    }`}
                    placeholder="123 Main St, Apt 4B"
                    {...register("address")}
                  />
                  {errors.address && (
                    <div className="invalid-feedback">
                      {errors.address.message}
                    </div>
                  )}
                </div>

                {/* City */}
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    className={`form-control checkout-input ${
                      errors.city ? "is-invalid" : ""
                    }`}
                    placeholder="Cairo"
                    {...register("city")}
                  />
                  {errors.city && (
                    <div className="invalid-feedback">
                      {errors.city.message}
                    </div>
                  )}
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={`form-control checkout-input ${
                      errors.phone ? "is-invalid" : ""
                    }`}
                    placeholder="+201234567890"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">
                      {errors.phone.message}
                    </div>
                  )}
                </div>

                {/* Payment Method */}
                <div className="mb-4">
                  <label className="form-label d-block">
                    Payment Method
                  </label>

                  <div className="form-check payment-option mb-2">
                    <input
                      id="paymentCod"
                      type="radio"
                      value="cod"
                      className="form-check-input"
                      {...register("paymentMethod")}
                    />
                    <label htmlFor="paymentCod" className="form-check-label">
                      Cash on Delivery
                    </label>
                  </div>

                  <div className="form-check payment-option">
                    <input
                      id="paymentCard"
                      type="radio"
                      value="card"
                      className="form-check-input"
                      {...register("paymentMethod")}
                    />
                    <label htmlFor="paymentCard" className="form-check-label">
                      Credit / Debit Card
                    </label>
                  </div>

                  {errors.paymentMethod && (
                    <div className="text-danger payment-error mt-1">
                      {errors.paymentMethod.message}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-checkout-primary w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Placing Order..." : "Place Order"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;