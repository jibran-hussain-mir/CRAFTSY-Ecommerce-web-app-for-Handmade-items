import React, { useState } from "react";
import "./css/Announcement.css";
import { AiOutlineClose } from "react-icons/ai";

const Announcement = () => {
  const [closeAnnouncementBox, setCloseAnnouncementBox] =
    useState("announcement");
  const handleCloseButton = () =>
    setCloseAnnouncementBox("announcement-hidden");

  return (
    <div className={closeAnnouncementBox}>
      <h2 className="message">Hurry it's 50% off today</h2>
      <AiOutlineClose className="close-button" onClick={handleCloseButton} />
    </div>
  );
};

export default Announcement;
