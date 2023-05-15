import React from "react";
import { IoIosAdd } from "react-icons/io";
import { TbCategory } from "react-icons/tb";
import { MdProductionQuantityLimits } from "react-icons/md";
import Avatar from "react-avatar";
import "./css/Sidebar.css";
import SidebarRow from "./SidebarRow";
import { isAuthenticated } from "../../auth";
import AddProduct from "../AddProduct";

const Sidebar = ({ setPath }) => {
  const { user, token } = isAuthenticated();

  return (
    <div className="sidebar">
      <div className="user_info">
        <Avatar
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU"
          classname="user_picture"
          name="Jibran"
          round
          size="45"
          textSizeRatio={1}
        />
        <h3 className="user_name">{user.name}</h3>
      </div>
      <hr></hr>
      <div className="row-list">
        <SidebarRow Icon={TbCategory} label="Add Category" setPath={setPath} />
        <SidebarRow
          Icon={MdProductionQuantityLimits}
          label="Add Product"
          setPath={setPath}
        />
        <SidebarRow
          Icon={MdProductionQuantityLimits}
          label="Add Product"
          setPath={setPath}
        />
        <SidebarRow
          Icon={MdProductionQuantityLimits}
          label="Add Product"
          setPath={setPath}
        />

        <SidebarRow
          Icon={MdProductionQuantityLimits}
          label="Add Product"
          setPath={setPath}
        />
      </div>
    </div>
  );
};

export default Sidebar;
