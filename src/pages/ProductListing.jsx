import Header from "../components/Header"
import { useState, useEffect } from "react"
import useFetch from "../useFetch"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"

const ProductListing = () => {
  const tag = useParams().param
  // console.log(tag)

  const { data, loading, error } = useFetch(
    "https://clothing-app-backend-sepia.vercel.app/api/products"
  )
  // console.log(data)

  const [filteredData, setFilteredData] = useState([])
  const [sortOrder, setSortOrder] = useState("")
  const [selectedCategory, setSelectedCategory] = useState([])
  const [rating, setRating] = useState(null)


  const [toastMessage, setToastMessage] = useState("")
      const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    setFilteredData(data || []) // Initialize with fetched data or empty array
    if (tag) {
      setSelectedCategory([tag]) // Set the category from URL parameter
    }
  }, [data, tag])

  //triggering the function everytime filteredData is changed
  useEffect(() => {
    // if (!data) return
    if (data) {
      let filtered = [...data]

      //filter by category
      if (selectedCategory.length > 0) {
        filtered = filtered.filter((item) =>
          selectedCategory.includes(item.category)
        )
        // console.log(filtered)
      }

      //filter by rating
      if (rating) {
        filtered = filtered.filter((item) => item.rating >= parseFloat(rating))
      }

      //sort by price
      if (sortOrder === "lowToHigh") {
        filtered.sort((a, b) => a.currentPrice - b.currentPrice)
      } else if (sortOrder === "highToLow") {
        filtered.sort((a, b) => b.currentPrice - a.currentPrice)
      }
      // console.log(filtered)
      setFilteredData(filtered)
    }
  }, [sortOrder, rating, selectedCategory, data])

  //function for matching the passed search text with the data recieved from api
  const handleSearch = (searchText) => {
    if (!data) return
    if (!searchText) {
      setFilteredData(data)
    } else {
      console.log(searchText.toLowerCase())
      const filteredItems = data.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      )
      setFilteredData(filteredItems)
      console.log("Filtered Items:", filteredItems)
    }
  }

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target

    if (checked) {
      setSelectedCategory((prevValue) => [...prevValue, value])
    } else {
      setSelectedCategory((prevValue) =>
        prevValue.filter((category) => category !== value)
      )
    }
  }

  const handleRatingChange = (event) => {
    setRating(event.target.value)
  }

  const handleSortClick = (event) => {
    setSortOrder(event.target.value)
  }

  const handleWishlist = async (item) => {
    try {
      const response = await fetch(
        "https://clothing-app-backend-sepia.vercel.app/api/wishlist/products",
        {
          method: "POST",
          body: JSON.stringify(item),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (!response.ok) {
        console.log("Failed to add item to wishlist")
      }

      const result = response.json()
      console.log("Item added to wishlist", result)

      setToastMessage("Item successfully added to wishlist")
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
        setToastMessage("")
      }, 1500)
      // alert("Item successfully added to wishlist")
    } catch (error) {
      console.log("Error adding to wishlist", error)
      alert("Failed to add item to wishlist")
    }
  }

  const handleAddToCart = async (item) => {
    try {
      // Send a POST request to add the item to the cart
      const response = await fetch(
        "https://clothing-app-backend-sepia.vercel.app/api/cart/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      )

      if (response.ok) {
        console.log("Item moved to cart")
        setToastMessage("Item successfully added to cart")
        setShowToast(true)
        setTimeout(() => {
          setShowToast(false)
          setToastMessage("")
        }, 1500)
      } else {
        console.error("Failed to move the item to cart")
        alert("Failed to move the item to cart")
      }
    } catch (error) {
      console.log("Error in moving the item to cart")
      alert("Error in moving the item to cart")
    }
  }

  return (
    <>
      <Header searchFunction={handleSearch} />
      {loading && <p className="text-center"> Loading...</p>}
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
      {error && <p className="text-center"> Error in fetching the products.</p>}
      <div className="container-fluid container mt-4">
        <div className="row">
          {/* Filters Section */}
          <div className="col-md-2">
            <div>
              <h5>Filters</h5>
              <button
                className="btn btn-outline-primary text-decoration-none p-1 px-2"
                onClick={() => {
                  setSelectedCategory([])
                  setRating(null)
                  setSortOrder("")
                  setFilteredData(data || [])
                }}
              >
                Clear
              </button>
            </div>

            {/* <div className="mt-4">
              <h6>Price</h6>
              <input type="range" className="form-range" min="50" max="200" />
            </div> */}

            <div className="mt-4">
              <h6>Category</h6>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="Men"
                  value="Men"
                  checked={selectedCategory.includes("Men")}
                  onChange={handleCategoryChange}
                />
                <label className="form-check-label" htmlFor="Men">
                  Men Clothing
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="Women"
                  value="Women"
                  checked={selectedCategory.includes("Women")}
                  onChange={handleCategoryChange}
                />
                <label className="form-check-label" htmlFor="Women">
                  Women Clothing
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="Kids"
                  value="Kids"
                  checked={selectedCategory.includes("Kids")}
                  onChange={handleCategoryChange}
                />
                <label className="form-check-label" htmlFor="Kids">
                  Kids Clothing
                </label>
              </div>
            </div>

            <div className="mt-4">
              <h6>Rating</h6>
              <div className="form-check">
                <input
                  type="radio"
                  id="rating4"
                  name="rating"
                  value="4"
                  checked={rating === "4"}
                  onChange={handleRatingChange}
                />
                <label htmlFor="rating4">4 Stars & above</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="rating3"
                  name="rating"
                  value="3"
                  checked={rating === "3"}
                  onChange={handleRatingChange}
                />
                <label htmlFor="rating3">3 Stars & above</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="rating2"
                  name="rating"
                  value="2"
                  checked={rating === "2"}
                  onChange={handleRatingChange}
                />
                <label htmlFor="rating2">2 Stars & above</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="rating1"
                  name="rating"
                  value="1"
                  checked={rating === "1"}
                  onChange={handleRatingChange}
                />
                <label htmlFor="rating1">1 Star & above</label>
              </div>
            </div>

            <div className="mt-4">
              <h6>Sort by</h6>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sort"
                  id="lowToHigh"
                  value="lowToHigh"
                  checked={sortOrder === "lowToHigh"}
                  onChange={handleSortClick}
                />
                <label className="form-check-label" htmlFor="lowToHigh">
                  Price - Low to High
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sort"
                  id="highToLow"
                  value="highToLow"
                  checked={sortOrder === "highToLow"}
                  onChange={handleSortClick}
                />
                <label className="form-check-label" htmlFor="highToLow">
                  Price - High to Low
                </label>
              </div>
            </div>
          </div>

          {/* second column - Products Section */}
          <div className="col-md-10">
            <h5>
              Showing All Products{" "}
              <span className="text-muted">({filteredData.length} items)</span>
            </h5>
            <div className="row mt-4">
              {filteredData.map((item, index) => (
                <div className="col-md-3 col-sm-6 mb-4" key={index}>
                  <Link
                    to={`/productDetails/${item._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="card h-100">
                      <img
                        src={item.imageUrl}
                        className="card-img-top"
                        alt="Product"
                      />
                      <div className="card-body text-center">
                        <h6 className="card-title">{item.name}</h6>
                        <span
                          // style={{ fontSize: 15 }}
                          className="me-2 text-warning"
                        >
                          &#9733; {item.rating}
                        </span>
                        <p className="fw-bold">₹{item.currentPrice}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={(event) => {
                              event.stopPropagation()
                              event.preventDefault()
                              handleWishlist(item)
                            }}
                          >
                            Wishlist
                          </button>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={(event) => {
                              event.stopPropagation()
                              event.preventDefault()
                              handleAddToCart(item)
                            }}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/*  row */}
      </div>
      {/*  outer div */}
    </>
  )
}

export default ProductListing
