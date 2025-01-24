import Header from "../components/Header"
import useFetch from "../useFetch"
import { useState, useEffect } from "react"

export default function OrderHistory() {
  // Fetching order data
  const { data, loading, error } = useFetch(
    "https://clothing-app-backend-sepia.vercel.app/api/orders"
  )
  console.log(data)

  return (
    <>
      <Header />
      {loading && <p className="text-center">Loading...</p>}
      {error && (
        <p className="text-center text-danger">Error in fetching orders.</p>
      )}

      {data && data.length > 0 && (
        <div className="container mt-5">
          <h3 className="text-center mb-4">
            Your Orders <span className="badge bg-primary">{data.length}</span>
          </h3>

          {data.map((order) => (
            <div className="card mb-4" key={order._id}>
              <div className="card-body">
                <h4 className="card-title">
                  Order ID: <span className="text-muted">{order._id}</span>
                </h4>
                <p className="card-text">
                  <strong>Total Amount:</strong> ₹{order.totalAmount}
                </p>
                <hr />

                <div>
                  <h5 className="mb-3">Items:</h5>
                  <ul className="list-group list-group-flush">
                    {order.items.map((item, index) => (
                      <li className="list-group-item" key={index}>
                        <strong>{item.name}</strong> (Size: {item.size}) - ₹
                        {item.price} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>

                <hr />
                <div>
                  <h5 className="mt-3">Shipping Address:</h5>
                  <p className="mb-2">
                    {order.addressLocation}, {order.street}, {order.city},{" "}
                    {order.state}, {order.country}
                  </p>
                  <p>
                    <strong>Postal Code:</strong> {order.postalCode}
                  </p>
                  <p>
                    <strong>Phone:</strong> {order.phoneNumber}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
