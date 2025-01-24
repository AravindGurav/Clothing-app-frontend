import Header from "../components/Header";
import Footer from "../components/Footer"
import { useState, useEffect } from "react"
import useFetch from "../useFetch"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

export default function Checkout() {
  const priceDetails = useLocation().state
  //  console.log(location)

  const { data, loading, error } = useFetch(
    "https://clothing-app-backend-sepia.vercel.app/api/address"
  )
  const [addressList, setAddressList] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)

  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    if (data) {
      setAddressList(data)
      setSelectedAddress(data[0])
    }
  }, [data])
  console.log(addressList)

  const handleAddressChange = (event) => {
    const id = event.target.value
    const selected = addressList.find((item) => item._id === id)
    setSelectedAddress(selected)
  }
  console.log(selectedAddress)

  const placeOrderHandler = async () => {
    try {
      // Get cart items data
      const cartResponse = await fetch(
        "https://clothing-app-backend-sepia.vercel.app/api/cart/products"
      )
      const cartItems = await cartResponse.json()

      // Prepare order data
      const orderData = {
        items: cartItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.currentPrice,
        })),
        totalAmount: priceDetails.totalAmount,
        user: selectedAddress.name,
        addressLocation: selectedAddress.addressLocation,
        street: selectedAddress.street,
        city: selectedAddress.city,
        state: selectedAddress.state,
        country: selectedAddress.country,
        postalCode: selectedAddress.postalCode,
        phoneNumber: selectedAddress.phoneNumber || "NA",
      }

      // Send POST request to create order
      const orderResponse = await fetch(
        "https://clothing-app-backend-sepia.vercel.app/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      )

      if (orderResponse.ok) {
        // Send DELETE request to clear the cart
        const deleteCartResponse = await fetch(
          "https://clothing-app-backend-sepia.vercel.app/api/cart/products",
          {
            method: "DELETE",
          }
        )

        if (deleteCartResponse.ok) {
          console.log("Order placed and cart cleared successfully!")
          setOrderPlaced(true)
        } else {
          console.error("Failed to clear the cart")
        }
      } else {
        console.error("Failed to place order")
      }
    } catch (error) {
      console.error("Error placing order:", error)
    }
    // try {
    //   // Send DELETE request to clear the cart
    //   const response = await fetch(
    //     "https://clothing-app-backend-sepia.vercel.app/api/cart/products",
    //     {
    //       method: "DELETE",
    //     }
    //   )

    //   if (response.ok) {
    //     console.log("Cart cleared successfully!", selectedAddress)
    //     setOrderPlaced(true)
    //   } else {
    //     console.error("Failed to clear the cart")
    //   }
    // } catch (error) {
    //   console.log("error in deleting ", error)
    // }
  }

  return (
    <>
      <Header />
      {loading && <p className="text-center"> Loading...</p>}
      {error && <p className="text-center"> Error in loading products.</p>}

      {orderPlaced ? (
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card text-center p-5">
                <i className="bi bi-check-circle-fill text-success display-1"></i>
                <h2 className="mt-4">Order Placed Successfully!</h2>

                <p className="">
                  Thank you for your purchase! items will be delivered to{" "}
                  {selectedAddress && (
                    <span>
                      {selectedAddress?.name} (
                      {selectedAddress?.addressLocation}) |{" "}
                      {selectedAddress?.street}, {selectedAddress?.city},{" "}
                      {selectedAddress?.postalCode}
                    </span>
                  )}
                </p>
                <Link to="/products" className="btn btn-primary mt-3">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container my-4">
          <h3 className="text-center fw-bold mt-2">CHECKOUT</h3>

          <div className="row justify-content-center">
            {/* Address Selection */}
            <div className="col-md-8 mb-3 py-3 card">
              <h5 className="fw-bold">Select Delivery Address</h5>
              <div className="mt-3">
                {addressList?.map((item) => (
                  <div key={item._id} className="container form-check">
                    <input
                      className="form-check-input"
                      name="address"
                      type="radio"
                      value={item._id}
                      id={item._id}
                      checked={selectedAddress?._id === item._id}
                      onChange={handleAddressChange}
                    />{" "}
                    <label htmlFor={item._id} className="ms-2">
                      {item.name} ({item.addressLocation}) | {item.street} ,{" "}
                      {item.city} ,{item.postalCode}
                    </label>{" "}
                    <br />
                  </div>
                ))}
              </div>
            </div>

            {/* Price Details */}
            <div className="col-md-4">
              <div className="border rounded p-4 ms-3">
                <h5 className="fw-bold">PRICE DETAILS</h5>
                <hr />
                <div className="d-flex justify-content-between">
                  <span>Price</span>
                  <span>₹{priceDetails.totalCurrentPrice}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Discount</span>
                  <span className="text-success">
                    - ₹{priceDetails.totalDiscount}
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Delivery Charges</span>
                  <span>₹{priceDetails.deliveryCharges}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>TOTAL AMOUNT</span>
                  <span>₹{priceDetails.totalAmount}</span>
                </div>
                <p className="text-success mt-2">
                  You will save ₹{priceDetails.totalDiscount} on this order.
                </p>
                <button
                  onClick={placeOrderHandler}
                  className="btn btn-primary w-100 mt-3"
                >
                  Place an order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}