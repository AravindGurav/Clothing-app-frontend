import { Link } from "react-router-dom"
import Header from "../components/Header"
import useFetch from "../useFetch"
import { useEffect, useState } from "react"

const Addresses = () => {
  const { data, loading, error } = useFetch(
    "https://clothing-app-backend-sepia.vercel.app/api/address"
  )
  const [addressData, setAddressData] = useState([])
  const [addAddress, setAddAddress] = useState(false)

  // States for the form
  const [name, setName] = useState("")
  const [addressLocation, setAddressLocation] = useState("")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  
  const [editAddress, setEditAddress] = useState(null)

  
    const [toastMessage, setToastMessage] = useState("")
      const [showToast, setShowToast] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      name,
      addressLocation,
      street,
      city,
      state,
      country,
      postalCode,
      phoneNumber,
    }

    try {
      if (editAddress) {
      
        const response = await fetch(
          `https://clothing-app-backend-sepia.vercel.app/api/address/${editAddress._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        )

        if (response.ok) {
             const updatedAddress = await response.json()
             setAddressData((prevData) =>
               prevData.map((address) =>
                 address._id === updatedAddress._id ? updatedAddress : address
               )
             )
             console.log("Updated Adrress:",updatedAddress)
          setEditAddress(null) 
           setToastMessage("Address updated successfully.")
           setShowToast(true)
           setTimeout(() => {
             setShowToast(false)
             setToastMessage("")
           }, 1500)
        } else {
          console.error("Error editing address")
        }
      } else {
        const response = await fetch(
          "https://clothing-app-backend-sepia.vercel.app/api/address",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        )

        if (response.ok) {
          const newAddress = await response.json()
             setAddressData((prevData) => [...prevData, newAddress])
             console.log(addressData)
          setAddAddress(false) // Close the form

           setToastMessage("Address added successfully.")
           setShowToast(true)
           setTimeout(() => {
             setShowToast(false)
             setToastMessage("")
           }, 1500)
        } else {
          console.error("Error adding address")
        }
      }
    } catch (error) {
      console.error("Error submitting address:", error)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://clothing-app-backend-sepia.vercel.app/api/address/${id}`,
        {
          method: "DELETE",
        }
      )

      if (response.ok) {
        setAddressData((prevData) =>
          prevData.filter((address) => address._id !== id)
        )
        console.log("Address deleted:", id)
         setToastMessage("Address deleted successfully.")
         setShowToast(true)
         setTimeout(() => {
           setShowToast(false)
           setToastMessage("")
         }, 1500)
      } else {
        console.error("Error deleting address:", response.statusText)
      }
    } catch (error) {
      console.error("Error deleting address:", error)
    }
  }

  const handleEdit = (address) => {
    setEditAddress(address)
    setAddAddress(true)
    setName(address.name)
    setAddressLocation(address.addressLocation)
    setStreet(address.street)
    setCity(address.city)
    setState(address.state)
    setCountry(address.country)
    setPostalCode(address.postalCode)
    setPhoneNumber(address.phoneNumber)
  }

  useEffect(() => {
    if (data) {
      setAddressData(data)
    }
  }, [data])

  return (
    <>
      <Header />
      {loading && <p className="text-center"> Loading...</p>}
      {error && <p className="text-center"> Error in loading address.</p>}
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
      <div className="container mt-4">
        <Link
          className="btn btn-primary mb-3"
          onClick={() => {
            setAddAddress(true)
            setEditAddress(null) // Reset editing state when adding new address
          }}
        >
          Add Address
        </Link>

        {/* Show the form to add or edit an address */}
        {addAddress && (
          <form onSubmit={handleSubmit} className="mb-4">
            <h3>{editAddress ? "Edit Address" : "Add New Address"}</h3>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Address Location</label>
              <input
                type="text"
                className="form-control"
                placeholder="Home or Work"
                value={addressLocation}
                onChange={(e) => setAddressLocation(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Street</label>
              <input
                type="text"
                className="form-control"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Country</label>
              <input
                type="text"
                className="form-control"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Postal Code</label>
              <input
                type="number"
                className="form-control"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="number"
                className="form-control"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success">
              {editAddress ? "Update" : "Submit"}
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => setAddAddress(false)}
            >
              Cancel
            </button>
          </form>
        )}

        <ul className="list-group">
          {addressData &&
            addressData?.map((address) => (
              <div className="row" key={address._id}>
                <div className="col-md-8 py-3">
                  <li className="list-group-item py-3">
                    <h5>
                      {address?.name} | {address?.addressLocation}
                    </h5>
                    <p>
                      {address?.street}, {address?.city}, {address?.state},{" "}
                      {address?.country}, {address?.postalCode}
                    </p>
                    <h6>{address?.phoneNumber}</h6>

                    <button
                      className="btn btn-sm btn-outline-success me-2"
                      onClick={() => handleEdit(address)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(address._id)}
                    >
                      Delete
                    </button>
                  </li>
                </div>
              </div>
            ))}
        </ul>
      </div>
    </>
  )
}

export default Addresses
