import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "./checkout.css";
import { useCart } from "../../Components/Cart/useCart";

// -----------------------------
// Validation Schema
// -----------------------------
const checkoutSchema = yup.object({
  fullName: yup.string().trim().required("Full name is required"),

  address: yup.string().trim().required("Shipping address is required"),

  city: yup.string().trim().required("City is required"),

  phone: yup
    .string()
    .trim()
    .required("Phone number is required")
    .matches(
      /^\+?[0-9]{8,15}$/,
      "Please enter a valid phone number"
    ),

  paymentMethod: yup
    .string()
    .oneOf(["cod", "card"], "Please select a payment method")
    .required("Please select a payment method"),

  cardNumber: yup.string().when("paymentMethod", {
    is: "card",
    then: (schema) =>
      schema
        .required("Card number is required")
        .matches(
          /^[0-9 ]{13,19}$/,
          "Please enter a valid card number"
        ),
    otherwise: (schema) => schema.notRequired(),
  }),

  expiryDate: yup.string().when("paymentMethod", {
    is: "card",
    then: (schema) =>
      schema
        .required("Expiry date is required")
        .matches(
          /^(0[1-9]|1[0-2])\/\d{2}$/,
          "Use MM/YY format"
        ),
    otherwise: (schema) => schema.notRequired(),
  }),

  cvv: yup.string().when("paymentMethod", {
    is: "card",
    then: (schema) =>
      schema
        .required("CVV is required")
        .matches(/^[0-9]{3,4}$/, "Invalid CVV"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const Checkout = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    cartTotal,
    clearCart,
  } = useCart();

  // -----------------------------
  // Route Protection
  // -----------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

  // -----------------------------
  // Scroll to top when entering checkout
  // -----------------------------
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // -----------------------------
  // Cart calculations
  // -----------------------------
  const shipping = cartItems.length ? 12 : 0;
  const orderTotal = cartTotal + shipping;

  // -----------------------------
  // React Hook Form
  // -----------------------------
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(checkoutSchema),

    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      phone: "",
      paymentMethod: "cod",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },

    mode: "onBlur",
  });

  const paymentMethod = watch("paymentMethod");

  // -----------------------------
  // Submit
  // -----------------------------
  const onSubmit = (data) => {
    const order = {
      ...data,

      items: cartItems,

      subtotal: cartTotal,

      shipping,

      total: orderTotal,

      placedAt: new Date().toISOString(),
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));

    clearCart();

    navigate("/thankyou");
  };

  return (
    <main className="checkout-page">
      <div className="container">

        {/* Page Header */}
        <div className="checkout-header">
          <h1 className="checkout-title">
            Checkout
          </h1>

          <p className="checkout-subtitle">
            Complete your order securely
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="checkout-layout">

            {/* =====================================
                LEFT SIDE - CUSTOMER INFORMATION
            ====================================== */}
            <section className="checkout-card checkout-form-card">

              <div className="checkout-section-header">
                <h2>Delivery Information</h2>

                <p>
                  Enter your details so we can deliver
                  your order to you.
                </p>
              </div>

              {/* Full Name */}
              <div className="checkout-field">
                <label htmlFor="fullName">
                  Full Name
                </label>

                <input
                  id="fullName"
                  type="text"
                  className={`checkout-input ${
                    errors.fullName ? "input-error" : ""
                  }`}
                  placeholder="Jane Doe"
                  {...register("fullName")}
                />

                {errors.fullName && (
                  <span className="checkout-error">
                    {errors.fullName.message}
                  </span>
                )}
              </div>

              {/* Address */}
              <div className="checkout-field">
                <label htmlFor="address">
                  Shipping Address
                </label>

                <input
                  id="address"
                  type="text"
                  className={`checkout-input ${
                    errors.address ? "input-error" : ""
                  }`}
                  placeholder="123 Main St, Apt 4B"
                  {...register("address")}
                />

                {errors.address && (
                  <span className="checkout-error">
                    {errors.address.message}
                  </span>
                )}
              </div>

              {/* City + Phone */}
              <div className="checkout-two-columns">

                <div className="checkout-field">
                  <label htmlFor="city">
                    City
                  </label>

                  <input
                    id="city"
                    type="text"
                    className={`checkout-input ${
                      errors.city ? "input-error" : ""
                    }`}
                    placeholder="Cairo"
                    {...register("city")}
                  />

                  {errors.city && (
                    <span className="checkout-error">
                      {errors.city.message}
                    </span>
                  )}
                </div>

                <div className="checkout-field">
                  <label htmlFor="phone">
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    className={`checkout-input ${
                      errors.phone ? "input-error" : ""
                    }`}
                    placeholder="+201234567890"
                    {...register("phone")}
                  />

                  {errors.phone && (
                    <span className="checkout-error">
                      {errors.phone.message}
                    </span>
                  )}
                </div>

              </div>

              {/* =====================================
                  PAYMENT METHOD
              ====================================== */}
              <div className="checkout-payment">

                <div className="checkout-section-header">
                  <h2>Payment Method</h2>

                  <p>
                    Choose how you would like to pay.
                  </p>
                </div>

                <div className="payment-methods">

                  {/* Cash */}
                  <label
                    className={`payment-option ${
                      paymentMethod === "cod"
                        ? "active"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      value="cod"
                      {...register("paymentMethod")}
                    />

                    <div className="payment-option-content">

                      <div className="payment-icon">
                        💵
                      </div>

                      <div>
                        <strong>
                          Cash on Delivery
                        </strong>

                        <small>
                          Pay when your order arrives
                        </small>
                      </div>

                    </div>

                    <span className="payment-check">
                      ✓
                    </span>
                  </label>


                  {/* Card */}
                  <label
                    className={`payment-option ${
                      paymentMethod === "card"
                        ? "active"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      value="card"
                      {...register("paymentMethod")}
                    />

                    <div className="payment-option-content">

                      <div className="payment-icon">
                        💳
                      </div>

                      <div>
                        <strong>
                          Credit / Debit Card
                        </strong>

                        <small>
                          Pay securely with your card
                        </small>
                      </div>

                    </div>

                    <span className="payment-check">
                      ✓
                    </span>
                  </label>

                </div>

                {errors.paymentMethod && (
                  <span className="checkout-error">
                    {errors.paymentMethod.message}
                  </span>
                )}

                {/* =====================================
                    CARD DETAILS
                ====================================== */}
                {paymentMethod === "card" && (
                  <div className="card-details">

                    <div className="card-details-header">
                      <h3>
                        Card Details
                      </h3>

                      <span>
                        🔒 Secure payment
                      </span>
                    </div>

                    {/* Card Number */}
                    <div className="checkout-field">
                      <label htmlFor="cardNumber">
                        Card Number
                      </label>

                      <input
                        id="cardNumber"
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        className={`checkout-input ${
                          errors.cardNumber
                            ? "input-error"
                            : ""
                        }`}
                        placeholder="1234 5678 9012 3456"
                        {...register("cardNumber")}
                      />

                      {errors.cardNumber && (
                        <span className="checkout-error">
                          {errors.cardNumber.message}
                        </span>
                      )}
                    </div>

                    {/* Expiry + CVV */}
                    <div className="checkout-two-columns">

                      <div className="checkout-field">
                        <label htmlFor="expiryDate">
                          Expiry Date
                        </label>

                        <input
                          id="expiryDate"
                          type="text"
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          className={`checkout-input ${
                            errors.expiryDate
                              ? "input-error"
                              : ""
                          }`}
                          placeholder="MM/YY"
                          maxLength={5}
                          {...register("expiryDate")}
                        />

                        {errors.expiryDate && (
                          <span className="checkout-error">
                            {errors.expiryDate.message}
                          </span>
                        )}
                      </div>

                      <div className="checkout-field">
                        <label htmlFor="cvv">
                          CVV
                        </label>

                        <input
                          id="cvv"
                          type="password"
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          className={`checkout-input ${
                            errors.cvv
                              ? "input-error"
                              : ""
                          }`}
                          placeholder="123"
                          maxLength={4}
                          {...register("cvv")}
                        />

                        {errors.cvv && (
                          <span className="checkout-error">
                            {errors.cvv.message}
                          </span>
                        )}
                      </div>

                    </div>

                  </div>
                )}

              </div>

              {/* Mobile Place Order */}
              <button
                type="submit"
                className="btn btn-checkout-primary mobile-place-order"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Placing Order..."
                  : "Place Order"}
              </button>

            </section>


            {/* =====================================
                RIGHT SIDE - ORDER SUMMARY
            ====================================== */}
            <aside className="checkout-summary">

              <div className="checkout-card">

                <div className="summary-header">
                  <h2>
                    Order Summary
                  </h2>

                  <span>
                    {cartItems.length}{" "}
                    {cartItems.length === 1
                      ? "item"
                      : "items"}
                  </span>
                </div>


                {/* Products */}
                <div className="checkout-products">

                  {cartItems.map((item) => (
                    <div
                      className="checkout-product"
                      key={item.id}
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                      />

                      <div className="checkout-product-info">

                        <h3>
                          {item.title}
                        </h3>

                        <p>
                          {item.quantity} × $
                          {item.price.toFixed(2)}
                        </p>

                      </div>

                      <strong>
                        $
                        {(
                          item.price *
                          item.quantity
                        ).toFixed(2)}
                      </strong>

                    </div>
                  ))}

                </div>


                {/* Totals */}
                <div className="checkout-totals">

                  <div>
                    <span>
                      Subtotal
                    </span>

                    <strong>
                      ${cartTotal.toFixed(2)}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Shipping
                    </span>

                    <strong>
                      ${shipping.toFixed(2)}
                    </strong>
                  </div>

                  <div className="checkout-total">
                    <span>
                      Total
                    </span>

                    <strong>
                      ${orderTotal.toFixed(2)}
                    </strong>
                  </div>

                </div>


                {/* Desktop Place Order */}
                <button
                  type="submit"
                  className="btn btn-checkout-primary desktop-place-order"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Placing Order..."
                    : "Place Order"}
                </button>
                <p className="checkout-secure-note">
                  🔒 Your information is protected
                  and secure.
                </p>
              </div>
            </aside>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Checkout;