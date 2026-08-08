// ThankYou.jsx
// BLOOMSHOP - Thank You / Order Confirmation Component
// Simple centered confirmation page shown after a successful checkout.

import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./checkout.css";

const ThankYou = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <div className="checkout-page d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-7 col-lg-5">
            <div className="checkout-card text-center">
              {/* Large green success checkmark badge */}
              <div className="success-badge mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="success-icon"
                  aria-hidden="true"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 6L9 17l-5-5"
                  />
                </svg>
              </div>

              <h1 className="checkout-title mb-2">Order Placed!</h1>
              <p className="checkout-subtitle mb-4">
                Thank you for your order! Your order has been placed
                successfully.
              </p>

              <button
                type="button"
                className="btn btn-checkout-primary w-100"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;