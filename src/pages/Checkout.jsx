import Header from "../components/Header";
import { useState, useEffect } from "react"
import useFetch from "../useFetch";
import { useLocation } from "react-router-dom";

export default function Checkout() {
     const priceDetails = useLocation().state
     console.log(location)

  const { data, loading, error } = useFetch(
    "https://clothing-app-backend-sepia.vercel.app/api/address"
  )
  const [addressList, setAddressList] = useState([])
     const [selectedAddress, setSelectedAddress] = useState(null)
     const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (data) {
      setAddressList(data)
      setSelectedAddress(data[0])
    }
  }, [data])
     console.log(addressList)

     const handleAddressChange = (event) => {
          const id = event.target.value
          const selected = addressList.find(item=> item._id === id)
       setSelectedAddress(selected)
       
     }
     console.log(selectedAddress)

     const placeOrderHandler = () => {
          setShowToast(true)
          
          setTimeout(() => {
               setShowToast(false)
          },3000)
 }

  return (
    <>
      <Header />
      {loading && <p className="text-center"> Loading...</p>}
      {error && <p className="text-center"> Error in loading products.</p>}
      <div className="container my-4">
        <h3 className="text-center fw-bold mt-2">CHECKOUT</h3>

        {/* Toast Message */}
        {showToast && (
          <div
            className="mb-3 toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            style={{ marginTop: "", width: "" }}
          >
            <div className="d-flex align-items-center ">
              <div className="toast-body mx-auto">
                Order Placed Successfully.
              </div>
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
                    checked={selectedAddress == item}
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
    </>
  )
}