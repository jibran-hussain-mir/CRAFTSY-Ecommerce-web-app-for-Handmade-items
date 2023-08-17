import React, { useEffect, useState } from "react";
import "./css/Dropdown.css";
import { isAuthenticated } from "../../../auth";
import { getStatusValues, updateOrderStatus } from "../../adminapi";

function DropDown({ orderId, refresh, productId }) {
  // console.log(orderId);
  const [statusValues, setStatusValues] = useState([]);
  const userId = isAuthenticated()?.user?._id;
  const token = isAuthenticated()?.token;
  const getValues = async () => {
    try {
      const data = await getStatusValues(userId, token);
      // console.log(data);
      if (data.error) {
        console.log(`error is in api of DropDown.jsx page`);
      } else {
        setStatusValues(data);
      }
    } catch (err) {
      console.log(err);
      console.log("The error is in DropDown.jsx page");
    }
  };
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option, event) => {
    // console.log(option);
    setSelectedOption(option);
    setIsOpen(false);
    updateOrderStatus(userId, token, orderId, productId, option)
      .then((data) => {
        if (data.error) {
          console.log("Status update failed");
        }
        refresh();
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getValues();
  }, []);

  return (
    <>
      <div className="dropdown-container">
        <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
          {selectedOption || "Select an option"}
        </div>
        {isOpen && (
          <ul className="dropdown-options">
            {statusValues.map((option, index) => (
              <li
                key={index}
                className="dropdown-option"
                onClick={(event) => handleOptionClick(option, event)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* {JSON.stringify(statusValues)} */}
    </>
  );
}

export default DropDown;
