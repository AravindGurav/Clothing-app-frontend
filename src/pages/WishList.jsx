import Header from "../components/Header";

import React, { useState, useEffect } from "react";
import useFetch from "../useFetch";

const Wishlist = () => {
  const [wishlistData, setWishlistData] = useState([])

    const { data, loading, error } = useFetch(
      "https://clothing-app-backend-sepia.vercel.app/api/wishlist/products"
    )
  
  const [toastMessage, setToastMessage] = useState("")
      const [showToast, setShowToast] = useState(false)
 
  useEffect(() => {
    if (data) {
      setWishlistData(data)
    }
  },[data])

     console.log(data)
 

  // Move item to cart make a post call to cart api
 const moveToCart = async (item) => {
    try {
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
        console.log("Item moved to cart");
        // alert("Item moved to cart successfully.");
        setWishlistData((prevData) =>
          prevData.filter((wishlistItem) => wishlistItem._id !== item._id)
        );
         setToastMessage("Item moved to cart successfully.")
         setShowToast(true)
         setTimeout(() => {
           setShowToast(false)
           setToastMessage("")
         }, 1500)
      } else {
        console.error("Failed to move item to cart");
        alert("Failed to move item to cart.");
      }
    } catch (error) {
      console.error("Error in moving item to cart", error);
      alert("Error in moving item to cart.");
    }
  };

  
     
     const handleRemoveClick = async (item_id) => {
          try {
            const response = await fetch(
              `https://clothing-app-backend-sepia.vercel.app/api/wishlist/products/${item_id}`,
              {
                method: "DELETE",
              }
            )
            
            if (response.ok) {
              console.log("Item removed from wishlist")
              setWishlistData((prevData) => prevData.filter(item => item._id !== item_id))
               setToastMessage("Item removed from wishlist")
               setShowToast(true)
               setTimeout(() => {
                 setShowToast(false)
                 setToastMessage("")
               }, 1500)
            }
            else{
                console.error("Failed to remove the item from wishlist")
                alert("Failed to remove the item from wishlist")
              }
            
          } catch (error) {
               console.log("Error in removing the item from wishlist")
               alert("Error in removing the item from wishlist")
          }
     }

     return (
       <>
         <Header />
         {loading && <p> Loading...</p>}
         {error && <p> Error in fetching the wishlist items.</p>}
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
         {wishlistData && wishlistData.length > 0 && (
           <div className="container my-5">
             <h2 className=" mb-4 fw-bold">My Wishlist</h2>
             <div className="row justify-content-start">
               {wishlistData.map((item) => (
                 <div key={item.id} className="col-md-3 mb-4 ">
                   <div className="card">
                     <img
                       src={item.imageUrl}
                       className="card-img-top img-fluid"
                       alt={item.name}
                     />
                     <div className="card-body text-center">
                       <h5 className="card-title fw-bold">{item.name}</h5>
                       <p className="card-text fs-5 fw-bold">
                         ₹{item.currentPrice}
                       </p>
                       <button
                         className="btn btn-sm btn-primary w-100 my-1"
                         onClick={() => moveToCart(item)}
                       >
                         Move to Cart
                       </button>
                       <button
                         className="btn btn-sm btn-danger w-100"
                         onClick={() => handleRemoveClick(item._id)}
                       >
                         Remove
                       </button>
                     </div>
                   </div>
                 </div>
               ))}
               {data.length === 0 && (
                 <p className="text-center mt-4">Your wishlist is empty.</p>
               )}
             </div>
           </div>
         )}
       </>
     )
};

export default Wishlist;
