import React, { useState, useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import useFetch from "../useFetch"
import { Link } from "react-router-dom"

const Cart = () => {
  const [cartData, setCartData] = useState([])
  const { data, loading, error } = useFetch(
    "https://clothing-app-backend-sepia.vercel.app/api/cart/products"
  )

  const [toastMessage, setToastMessage] = useState("")
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (data) {
      setCartData(Array.isArray(data) ? data : [])
    }
  }, [data])

  const handleRemoveFromCart = async (item_id) => {
    try {
      const response = await fetch(
        `https://clothing-app-backend-sepia.vercel.app/api/cart/products/${item_id}`,
        {
          method: "DELETE",
        }
      )

      if (response.ok) {
        console.log("Item removed from cart")
        setCartData((prevData) =>
          prevData.filter((item) => item._id !== item_id)
        )
        setToastMessage("Item removed from the cart")
        setShowToast(true)
        setTimeout(() => {
          setShowToast(false)
          setToastMessage("")
        }, 1500)
      } else {
        console.error("Failed to remove the item from cart")
        alert("Failed to remove the item from cart")
      }
    } catch (error) {
      console.log("Error in removing the item from cart")
      alert("Error in removing the item from cart")
    }
  }

  const handleMoveToWishlist = async (item) => {
    try {
      // Send a POST request to add the item to the wishlist
      const response = await fetch(
        "https://clothing-app-backend-sepia.vercel.app/api/wishlist/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      )

      if (response.ok) {
        console.log("Item moved to wishlist")

        // Remove the item from the cart after adding it to the wishlist
        await handleRemoveFromCart(item._id)
        setToastMessage("Item moved to wishlist")
        setShowToast(true)
        setTimeout(() => {
          setShowToast(false)
          setToastMessage("")
        }, 1500)
      } else {
        console.error("Failed to move the item to wishlist")
        alert("Failed to move the item to wishlist")
      }
    } catch (error) {
      console.log("Error in moving the item to wishlist")
      alert("Error in moving the item to wishlist")
    }
  }

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      const response = await fetch(
        `https://clothing-app-backend-sepia.vercel.app/api/cart/products/${itemId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      )

      if (response.ok) {
        console.log("Quantity updated successfully")

        // Update the local state for the specific cart item
        setCartData((prevData) =>
          prevData.map((item) =>
            item._id === itemId ? { ...item, quantity: newQuantity } : item
          )
        )
      } else {
        console.error("Failed to update the quantity")
        alert("Failed to update the quantity")
      }
    } catch (error) {
      console.log("Error in updating the quantity", error)
      alert("Error in updating the quantity")
    }
  }

  // Calculate total quantity of items in the cart
  const totalQuantity = cartData.reduce(
    (acc, item) => acc + Number(item.quantity),
    0
  )

  //price calculation

  const totalPrice = cartData.reduce(
    (acc, item) => acc + item.originalPrice * item.quantity,
    0
  )
  const totalCurrentPrice = cartData.reduce(
    (acc, item) => acc + item.currentPrice * item.quantity,
    0
  )
  const totalDiscount = totalPrice - totalCurrentPrice
  const deliveryCharges = 99
  const totalAmount = totalCurrentPrice + deliveryCharges

  const priceDetails = {
    totalPrice,
    totalCurrentPrice,
    totalDiscount,
    deliveryCharges,
    totalAmount,
  }

  return (
    <>
      <Header />
      {loading && <p className="text-center">Loading...</p>}
      {error && (
        <p className="text-center">Error in fetching the cart items.</p>
      )}
      {/* Toast Message */}
      {showToast && (
        <div
          className="mb-3 container toast show"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{ marginTop: "", width: "" }}
        >
          <div className="d-flex align-items-center ">
            <div className="toast-body mx-auto">{toastMessage}</div>
            <button
              type="button"
              className="btn-close me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={() => setShowToast(false)}
            ></button>
          </div>
        </div>
      )}

      {!loading && !error && cartData.length === 0 && (
        <div className="container text-center my-5">
          <i className="bi bi-cart-x display-1 text-muted"></i>
          <h2 className="mt-3">Your cart is empty</h2>
          <p className="text-muted">
            Looks like you haven't added anything yet
          </p>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      )}
      {cartData && cartData.length > 0 && (
        <div className="container my-4">
          <h3 className="text-center fw-bold">MY CART ({totalQuantity})</h3>

          <div className="row justify-content-center">
            {/* Left Section: Product Details */}
            <div className="col-md-8">
              {cartData.map((item) => (
                <div className="d-flex border rounded p-3 mb-4" key={item._id}>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="img-fluid rounded"
                    style={{ maxWidth: "150px" }}
                  />
                  <div className="ms-3">
                    <h5>{item.name}</h5>
                    <h4 className="fw-bold">
                      ₹{item.currentPrice}{" "}
                      <span className="text-decoration-line-through text-muted fs-6">
                        ₹{item.originalPrice}
                      </span>
                    </h4>
                    <p className="text-success fw-bold">{item.discount}% off</p>
                    <div className="d-flex align-items-center">
                      <span className="me-2">Quantity:</span>
                      <input
                        type="number"
                        defaultValue={item.quantity}
                        className="form-control w-25"
                        onChange={(event) =>
                          handleQuantityChange(item._id, event.target.value)
                        }
                      />
                    </div>
                    <div className="d-flex align-items-center mt-1">
                      <span className="me-2">Size:</span>
                      <button className="btn btn-outline-primary btn-sm ms-4">
                        {item.size}
                      </button>
                    </div>
                    <div className="mt-3">
                      <button
                        className="btn btn-secondary me-2 mb-2"
                        onClick={() => handleRemoveFromCart(item._id)}
                      >
                        Remove From Cart
                      </button>
                      <button
                        className="btn btn-outline-secondary mb-2"
                        onClick={() => handleMoveToWishlist(item)}
                      >
                        Move to Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Section: Price Details */}
            <div className="col-md-4">
              <div className="border rounded p-4 ms-3">
                <h5 className="fw-bold">PRICE DETAILS</h5>
                <hr />
                <div className="d-flex justify-content-between">
                  <span>Price ({} item)</span>
                  <span>₹{totalCurrentPrice}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Discount</span>
                  <span className="text-success">- ₹{totalDiscount}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Delivery Charges</span>
                  <span>₹{deliveryCharges}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>TOTAL AMOUNT</span>
                  <span>₹{totalAmount}</span>
                </div>
                <p className="text-success mt-2">
                  You will save ₹{totalDiscount} on this order
                </p>
                <Link
                  to="/checkout"
                  state={priceDetails}
                  className="btn btn-primary w-100 mt-3"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}

export default Cart
