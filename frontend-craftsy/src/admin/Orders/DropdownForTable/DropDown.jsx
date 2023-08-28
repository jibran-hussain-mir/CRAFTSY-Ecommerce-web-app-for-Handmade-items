import React, { useEffect, useState } from "react";
import "./css/Dropdown.css";
import { isAuthenticated } from "../../../auth";
import {
  getStatusValues,
  updateOrderStatus,
  generateOTP,
  sendOTP,
} from "../../adminapi";
import ErrorMessage from "../../../Notifications/ErrorMessage";

function DropDown({ orderId, refresh, productId, customerEmail }) {
  console.log(customerEmail);
  const [statusValues, setStatusValues] = useState([]);
  const [error, setError] = useState(false);
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

  const getOTP = async () => {
    try {
      const { otp } = await generateOTP();
      console.log(otp);
      const subject = `OTP for your delivery is ${otp}`;
      await sendOTP(customerEmail, "OTP for Delivery", subject);
      setGeneratedOtp(otp);
      setOtpSent(true);
    } catch (e) {
      console.log(e);
    }
  };
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // States for OTP
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");

  const handleOptionClick = (option, event) => {
    // console.log(option);
    setSelectedOption(option);
    setIsOpen(false);
    if (option === "Delivered") {
      // Open OTP modal and generate OTP
      setShowOtpModal(true);
      getOTP();
    } else {
      // Update order status without OTP
      updateStatus(option);
    }
  };
  const updateStatus = (option) => {
    updateOrderStatus(userId, token, orderId, productId, option)
      .then((data) => {
        if (data.error) {
          console.log("Status update failed");
        }
        refresh();
      })
      .catch((e) => console.log(e));
  };

  const handleOtpSubmit = () => {
    if (otp === generatedOtp) {
      // OTP is correct, update order status
      updateStatus("Delivered");
      setShowOtpModal(false); // Close the OTP modal
    } else {
      console.log("Incorrect OTP");
      setError("Incorrect OTP");
      // You can display an error message to the user here
    }
  };
  const handleChange = (e) => {
    setError(false);
    setOtp(e.target.value);
  };
  const showError = () => {
    if (error) {
      return <ErrorMessage message={error} />;
    }
  };
  useEffect(() => {
    getValues();
  }, []);

  return (
    <>
      {showError()}
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
      {showOtpModal && (
        <div className="modal" onClick={() => setShowOtpModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* ... (modal content) */}
          </div>
        </div>
      )}
      {/* OTP Modal */}
      {showOtpModal && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="close-button"
              onClick={() => setShowOtpModal(false)}
            >
              &times;
            </button>
            <p className="modal-message">
              An OTP has been sent to your registered email.
            </p>
            <input
              className="modal-input"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleChange}
            />
            <button className="modal-button" onClick={handleOtpSubmit}>
              Submit OTP
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DropDown;
