import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

const Profile = () => {
  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-4 ">
            <div className="card mb-2">
              <div className="card-body">
                <div className="text-center mb-4">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt="Profile"
                    className="rounded-circle img-fluid"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <h3 className="mt-3">Aravind </h3>
                  <p className="text-muted">Member since 2021</p>
                </div>

                <div className="mb-3">
                  <h6>Name:</h6>
                  <p>Aravind Gurav</p>
                </div>

                <div className="mb-3">
                  <h6>Email:</h6>
                  <p>aravindgurav@gmail.com</p>
                </div>

                <div className="mb-3">
                  <h6>Phone:</h6>
                  <p>+91 886239489</p>
                </div>
              </div>
            </div>
          </div>
          {/* //2nd card */}
          <div className="col-md-4 ">
            <div className="card mb-2">
              <div className="card-body">
                <div className="text-center mb-4">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt="Profile"
                    className="rounded-circle img-fluid"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <h3 className="mt-3">Dustin</h3>
                  <p className="text-muted">Member since 2019</p>
                </div>

                <div className="mb-3">
                  <h6>Name:</h6>
                  <p>Dustin Henderson </p>
                </div>

                <div className="mb-3">
                  <h6>Email:</h6>
                  <p>dustinhenderson@example.com</p>
                </div>

                <div className="mb-3">
                  <h6>Phone:</h6>
                  <p>+1 234 567 8900</p>
                </div>
              </div>
            </div>
          </div>
          {/* //3rd card */}
          <div className="col-md-4 ">
            <div className="card mb-2">
              <div className="card-body">
                <div className="text-center mb-4">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt="Profile"
                    className="rounded-circle img-fluid"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <h3 className="mt-3">Bruno</h3>
                  <p className="text-muted">Member since 2013</p>
                </div>

                <div className="mb-3">
                  <h6>Name:</h6>
                  <p>Bruno Mars</p>
                </div>

                <div className="mb-3">
                  <h6>Email:</h6>
                  <p>brunomars@example.com</p>
                </div>

                <div className="mb-3">
                  <h6>Phone:</h6>
                  <p>+1 234 567 8900</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link
          to="/address"
          className="btn btn-primary btn-md rounded-pill d-flex align-items-center justify-content-center gap-2 mt-3 shadow"
        >
          <i className="bi bi-geo-alt"></i>
          Manage Saved Addresses
        </Link>

        <Link
          to="/OrderHistory"
          className="btn btn-secondary btn-md rounded-pill d-flex align-items-center justify-content-center gap-2 mt-3 shadow"
        >
          <i className="bi bi-clock-history"></i>
          Order History
        </Link>
      </div>
      <Footer />
    </>
  )
}

export default Profile
