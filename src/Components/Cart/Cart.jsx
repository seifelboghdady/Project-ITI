import { useLocation, useNavigate } from "react-router-dom";
import { BsDash, BsPlus, BsTrash } from "react-icons/bs";
import { useCart } from "./useCart";
import { useEffect } from "react";
import "./Cart.css";

export const Cart = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } =
    useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const continueShopping = () => {
    const returnTo = location.state?.returnTo;
    navigate(returnTo && returnTo !== "/cart" ? returnTo : "/");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const shipping = cartItems.length ? 12 : 0;
  const orderTotal = cartTotal + shipping;

  const continueShoppingButton = (className) => (
    <button type="button" className={className} onClick={continueShopping}>
      Continue Shopping
    </button>
  );

  if (!cartItems.length) {
    return (
      <main className="cart-page">
        <div className="container py-5 text-center">
          <h1 className="fw-bold mb-3">Your Cart</h1>
          <p className="text-muted mb-4">Your cart is empty.</p>
          {continueShoppingButton(
            "btn cart-primary-btn empty-cart-button rounded-pill px-4"
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="container py-5">
        <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
          <div>
            <h1 className="fw-bold mb-1">Your Cart</h1>
            <p className="text-muted mb-0">
              {cartItems.length} product{cartItems.length > 1 ? "s" : ""} in
              your bag
            </p>
          </div>
          <button
            type="button"
            className="btn btn-outline-danger rounded-pill px-4 align-self-start"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>

        <div className="row g-4">
          <section className="col-lg-8">
            <div className="cart-list">
              {cartItems.map((item) => (
                <article className="cart-item" key={item.id}>
                  <img src={item.thumbnail} alt={item.title} />

                  <div className="cart-item-info">
                    <h2>{item.title}</h2>
                    <p className="mb-0">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="quantity-control" aria-label="Quantity">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <BsDash />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(event) =>
                        updateQuantity(item.id, event.target.value)
                      }
                    />
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <BsPlus />
                    </button>
                  </div>

                  <strong className="cart-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </strong>

                  <button
                    type="button"
                    className="remove-btn"
                    aria-label={`Remove ${item.title}`}
                    onClick={() => removeFromCart(item.id)}
                  >
                    <BsTrash />
                  </button>
                </article>
              ))}
            </div>
          </section>

          <aside className="col-lg-4">
            <div className="cart-summary">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>
                <strong>${cartTotal.toFixed(2)}</strong>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <strong>${shipping.toFixed(2)}</strong>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <strong>${orderTotal.toFixed(2)}</strong>
              </div>

              <button type="button" className="btn cart-primary-btn w-100" onClick={() => navigate("/checkout")}>
                Checkout
              </button>
              {continueShoppingButton("btn btn-outline-dark w-100 mt-2")}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};
