import { Link } from "react-router-dom"
import { useState } from "react"
export default function Header({ searchFunction }) {
  
  const [searchText, setSearchText] = useState("")

  const searchTextHandler = (event) => {
    setSearchText(event.target.value)
    searchFunction(event.target.value) //I am passing the searchText value to the HomePagecomponent or parent component
  }
     return (
       <>
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
           <div className="container">
             <Link className="navbar-brand" to="/">
               Shopify
             </Link>

             <div className="d-flex">
               <input
                 className="form-control me-2"
                 type="search"
                 placeholder="Search"
                 onChange={searchTextHandler}
                 aria-label="Search"
               />
             </div>
             <div className="d-flex align-items-center">
               <Link to="/profile" className=" text-dark fs-5 ms-4">
                 <i className="bi bi-person-circle"></i>
               </Link>
               <Link
                 to="/wishlist"
                 className="text-dark text-decoration-none ms-4"
               >
                 <i className="bi bi-heart fs-4"></i>
               </Link>
               <Link
                 to="/cart"
                 className="text-dark text-decoration-none fs-5 ms-4"
               >
                 <i className="bi bi-cart fs-4"></i>Cart
               </Link>
             </div>
           </div>
         </nav>
       </>
     )
}