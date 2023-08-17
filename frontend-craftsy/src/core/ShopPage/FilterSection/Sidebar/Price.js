// import React, { useState } from "react";
// import "./Price.css";
// import Input from "../Components/Input";

// function Price({ handleChange, handlePriceChange }) {
//   const [selectedPrice, setSelectedPrice] = useState(null);
//   console.log(selectedPrice);

//   // const handlePriceChange = (priceRange) => {
//   //   setSelectedPrice(priceRange);
//   //   handleChange(priceRange, "price"); // Pass the selected price range to the parent
//   // };
//   const handlePriceCheckboxChange = (priceRange) => {
//     console.log("Price checkbox change:", priceRange);
//     setSelectedPrice(priceRange);
//     handlePriceChange(priceRange); // Pass the selected price range to the parent
//   };
//   return (
//     <>
//       <div className="ml">
//         <h2 className="sidebar-title price-title">Price</h2>
//         <div className="cate-cont-f">
//           <label className="sidebar-label-container">
//             <input onChange={handleChange} type="radio" value="" name="test2" />
//             <span className="checkmark"></span>All
//           </label>
// <Input
//   handleChange={handlePriceCheckboxChange}
//   value={[0, 1000]}
//   title="Rs. 0 - Rs. 1000"
//   name="test2"
//   selectedPrice={selectedPrice} // Pass the selectedPrice state
// />
// <Input
//   handleChange={handlePriceCheckboxChange}
//   value={[1000, 3000]}
//   title="Rs. 1000 - Rs. 3000"
//   name="test2"
//   selectedPrice={selectedPrice} // Pass the selectedPrice state
// />
// <Input
//   handleChange={handlePriceCheckboxChange}
//   value={[3000, 5000]}
//   title="Rs. 3000 - Rs. 5000"
//   name="test2"
//   selectedPrice={selectedPrice} // Pass the selectedPrice state
// />
// <Input
//   handleChange={handlePriceCheckboxChange}
//   value={[5000, 1000000]}
//   title="Over Rs. 5000"
//   name="test2"
//   selectedPrice={selectedPrice} // Pass the selectedPrice state
// />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Price;
import React, { useState } from "react";
import "./Price.css";
import Input from "../Components/Input";

function Price({ handleChange, handlePriceChange }) {
  const [selectedPrice, setSelectedPrice] = useState(null);

  const handlePriceCheckboxChange = (priceRange) => {
    setSelectedPrice(priceRange);
    handlePriceChange(priceRange); // Pass the selected price range to the parent
  };

  return (
    <div className="ml">
      <h2 className="sidebar-title price-title">Price</h2>
      <div className="cate-cont-f">
        {/* <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test2" />
          <span className="checkmark"></span>All
        </label> */}
        {/* Other Input components */}
        <Input
          handleChange={handlePriceCheckboxChange}
          value={[0, 1000]}
          title="Rs. 0 - Rs. 1000"
          name="test2"
          // selectedPrice={selectedPrice} // Pass the selectedPrice state
        />
        <Input
          handleChange={handlePriceCheckboxChange}
          value={[1000, 3000]}
          title="Rs. 1000 - Rs. 3000"
          name="test2"
          selectedPrice={selectedPrice} // Pass the selectedPrice state
        />
        <Input
          handleChange={handlePriceCheckboxChange}
          value={[3000, 5000]}
          title="Rs. 3000 - Rs. 5000"
          name="test2"
          selectedPrice={selectedPrice} // Pass the selectedPrice state
        />
        <Input
          handleChange={handlePriceCheckboxChange}
          value={[5000, 1000000]}
          title="Over Rs. 5000"
          name="test2"
          selectedPrice={selectedPrice} // Pass the selectedPrice state
        />
      </div>
    </div>
  );
}

export default Price;
