import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProductListing from "./pages/ProductListing"
import ProductDetails from "./pages/ProductDetails"
import WishList from "./pages/WishList"
import Cart from "./pages/Cart"
import Addresses from "./pages/Addresses"
import Checkout from "./pages/Checkout"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/address" element={<Addresses />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/products/:param" element={<ProductListing />} />
        <Route path="/productDetails/:productId" element={<ProductDetails />} />
      </Routes>
    </Router>
  )
}

export default App
