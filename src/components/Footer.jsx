const Footer = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(to right, #2c2c2c, #1a1a1a)", // Greyish black gradient background
        color: "#fff",
        padding: "20px 0",
        textAlign: "center",
        borderTop: "1px solid #444",
      }}
    >
      <div className="container text-center">
        <div className="row">
          <div className="col-md-6">
            <h5>About Us</h5>
            <p>
              We provide high-quality clothing with a focus on style, comfort,
              and customer satisfaction.
            </p>
          </div>
          <div className="col-md-6">
            <h5>Contact Us</h5>
            <p>
              Email:{" "}
              <a href="mailto:support@shopify.com" className="text-light">
                support@shopify.com
              </a>
            </p>
          </div>
        </div>
        <div className="mt-3">
          <p className="mb-0">&copy; 2025 Shopify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
