import Header from "../components/Header";
import useFetch from "../useFetch";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function ProductDetails() {
  const pid = useParams().productId
  const { data, loading, error } = useFetch(
    `https://clothing-app-backend-sepia.vercel.app/api/products/${pid}`
  )
  //  console.log(pid)
  //  console.log(data)

  const [quantity, setQuantity] = useState(1) 
  const [selectedSize, setSelectedSize] = useState("") 

  const [toastMessage, setToastMessage] = useState("")
      const [showToast, setShowToast] = useState(false)


  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.")
      return
    }

    // Include the entire product data + quantity and selected size
    const cartItem = {
      ...data,
      size: selectedSize, 
      quantity, 
    }

    try {
      const response = await fetch(
        `https://clothing-app-backend-sepia.vercel.app/api/cart/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartItem),
        }
      )

      if (response.ok) {
        // alert("Item added to cart successfully!")
setToastMessage("Item added to cart successfully!")
setShowToast(true)
setTimeout(() => {
  setShowToast(false)
  setToastMessage("")
}, 1500)

      } else {
        alert("Failed to add item to cart.")
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
      alert("An error occurred. Please try again.")
    }
  }

  return (
    <>
      <Header />
      {loading && <p> Loading...</p>}
      {error && <p> Error in fetching the products.</p>}
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
      {data && Object.keys(data).length > 0 && (
        <div className="container mt-4">
          {/* Product Details Section */}
          <div className="row">
            <div className="col-md-5">
              <img
                src={data.imageUrl}
                alt={data.name}
                className="img-fluid border"
              />
            </div>
            <div className="col-md-7">
              <h2>
                {data.name} | {data.title}
              </h2>
              <div className="d-flex align-items-center">
                <span style={{ fontSize: 24 }} className="me-2 text-warning">
                  &#9733; {data.rating}
                </span>
              </div>
              <h3 className="mt-3">
                ₹{data.currentPrice}{" "}
                <span className="text-muted text-decoration-line-through">
                  ₹{data.originalPrice}
                </span>{" "}
              </h3>
              <span className="text-success fw-bold">{data.discount}% off</span>
              <div className="mt-3">
                <h5>Quantity:</h5>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="form-control w-25"
                />
              </div>
              <div className="mt-3">
                <h5>Size:</h5>
                {data.sizes.map((sizeData) => (
                  <button
                    className={`btn btn-sm me-2 ${
                      selectedSize === sizeData
                        ? "btn-secondary"
                        : "btn-outline-secondary"
                    }`}
                    key={sizeData}
                    onClick={() => setSelectedSize(sizeData)}
                  >
                    {sizeData}
                  </button>
                ))}
              </div>
              <div className="mt-3">
                <button className="btn btn-primary" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </div>
              {/* Description Section */}

              <div className="mt-4">
                <h4>Description:</h4>
                <p>{data.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}