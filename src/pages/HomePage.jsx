import {Link} from "react-router-dom"
import Header from "../components/Header"
import useFetch from "../useFetch"

const HomePage = () => {
  //    const { data, loading, error } = useFetch(
  //      "http://localhost:4000/api/products"
  // )


    //  console.log(data)
     return (
       <>
         <Header />

         <div className="container mt-4">
           <div className="row text-center">
             {/* Card for Men */}
             <div className="col-md-4 col-sm-6 mb-3">
               <Link to="/products/Men" className="text-decoration-none">
                 <div className="card">
                   <img
                     src="https://static.zara.net/assets/public/e2b1/f0f0/2bf4479b9342/22c73eac0cfe/03286400800-a1/03286400800-a1.jpg?ts=1733935173959&w=600"
                     className="card-img-top img-fluid"
                     alt="Men"
                   />
                   <div className=" d-flex align-items-end">
                     <h5 className="text-white w-100 bg-dark bg-opacity-50 text-center py-2 m-0">
                       Men
                     </h5>
                   </div>
                 </div>
               </Link>
             </div>

             {/* Card for Women */}
             <div className="col-md-4 col-sm-6 mb-3">
               <Link to="/products/Women" className="text-decoration-none">
                 <div className="card">
                   <img
                     src="https://static.zara.net/assets/public/7a6a/ecc3/c38d4679b934/c53a07b7ea16/05030747811-a1/05030747811-a1.jpg?ts=1731670156656&w=1643"
                     className="card-img-top img-fluid"
                     alt="Women"
                   />
                   <div className=" d-flex align-items-end">
                     <h5 className="text-white w-100 bg-dark bg-opacity-50 text-center py-2 m-0">
                       Women
                     </h5>
                   </div>
                 </div>
               </Link>
             </div>

             {/* Card for Kids */}
             <div className="col-md-4 col-sm-6 mb-3">
               <Link to="/products/Kids" className="text-decoration-none">
                 <div className="card">
                   <img
                     src="https://static.zara.net/assets/public/281d/e2ec/333f439a9a91/5dd363406625/05644960712-a1/05644960712-a1.jpg?ts=1732788394880&w=780"
                     className="card-img-top img-fluid"
                     alt="Kids"
                   />
                   <div className=" d-flex align-items-end">
                     <h5 className="text-white w-100 bg-dark bg-opacity-50 text-center py-2 m-0">
                       Kids
                     </h5>
                   </div>
                 </div>
               </Link>
             </div>
           </div>
         </div>

         {/* Banner */}
         <div className="container mt-2 py-4">
           <img
             src="https://static.zara.net/assets/public/fa62/6ac3/3a214c179785/6c5b2dfd983a/image-landscape-359700f9-c43a-46dd-9aec-0c3963db46bc-default_0/image-landscape-359700f9-c43a-46dd-9aec-0c3963db46bc-default_0.jpg?ts=1734536881505&w=1920"
             className="img-fluid"
             alt="placehold"
           />
         </div>

         {/* seasonal categories */}
         <div className="container mb-3 py-3">
           <div className="row">
             <div className="col-md-6">
               <Link style={{ textDecoration: "none" }} to={`/products`}>
                 <div className="card">
                   <div className="row g-0">
                     <div className="col-md-4 ">
                       <img
                         src="https://static.zara.net/assets/public/49f4/bf27/93ff45e4922f/da2998bc7936/09731147800-p/09731147800-p.jpg?ts=1729586356910&w=315"
                         className="img-fluid"
                         alt="placehold"
                       />
                     </div>

                     <div className="col-md-8 ">
                       <div className="card-body">
                         <h6 className="">NEW ARRIVALS</h6>
                         <h5 className="card-title">Summer Collection</h5>
                         <p className="card-text">
                           Check out our best winter collection to stay warm in
                           style this season
                         </p>
                       </div>
                     </div>
                   </div>
                 </div>
               </Link>
             </div>
             {/* //card2 */}
             <div className="col-md-6">
               <Link style={{ textDecoration: "none" }} to={`/products`}>
                 <div className="card">
                   <div className="row g-0">
                     <div className="col-md-4 ">
                       <img
                         src="https://static.zara.net/assets/public/d5eb/6abd/f5ae4f43a7f8/eecc7e25fe0b/04360246832-p/04360246832-p.jpg?ts=1733927619460&w=315"
                         className="img-fluid"
                         alt="placehold"
                       />
                     </div>

                     <div className="col-md-8 ">
                       <div className="card-body">
                         <h6 className="">NEW ARRIVALS</h6>
                         <h5 className="card-title">Winter Collection</h5>
                         <p className="card-text">
                           Check out our best winter collection to stay warm in
                           style this season
                         </p>
                       </div>
                     </div>
                   </div>
                 </div>
               </Link>
             </div>
           </div>
         </div>
       </>
     )
}

export default HomePage