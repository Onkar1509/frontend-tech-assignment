import React from "react";
import { BiBookOpen } from "react-icons/bi";
import { GoRepo } from "react-icons/go";
import { TbTable, TbPackage, TbStar } from "react-icons/tb";
import "reactjs-popup/dist/index.css";
import ProfileDetails from "../components/ProfileDetails";
import Repositories from "../components/Repositories";
function MainPage() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ width: "25%" }}></div>
        <div className="subNavbarDivTwo">
          <div className="subNavbarItems">
            <BiBookOpen />
            <span>Overview</span>
          </div>
          <div className="subNavbarItems active">
            <GoRepo />
            <span>Repositories</span>
          </div>
          <div className="subNavbarItems">
            <TbTable />
            <span>Projects</span>
          </div>
          <div className="subNavbarItems">
            <TbPackage />
            <span>Packages</span>
          </div>
          <div className="subNavbarItems">
            <TbStar />
            <span>Stars</span>
          </div>
        </div>
      </div>
      <hr />
      <div style={{ display: "flex" }}>
        <div style={{ width: "25%" }}>
          <ProfileDetails />
        </div>
        <div className="repoSearchDiv">
          <Repositories />
        </div>
      </div>
    </>
  );
}

export default MainPage;
