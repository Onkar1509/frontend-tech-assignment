import React from "react";
import profileImage from "../assets/profileImage.jpeg";
import { HiUsers } from "react-icons/hi";
import { GoLocation } from "react-icons/go";
import { AiOutlineMail } from "react-icons/ai";

function ProfileDetails() {
  return (
    <>
      <div>
        <img src={profileImage} style={{ width: "100%" }} alt="indrek lasn" />
        <div>
          <div>
            <span className="userNameHead">Indrek lasn</span>
          </div>
          <span className="userName">iindrekLasn</span>
          <div>
            <button className="editProfileBtn">Edit Profile</button>
          </div>
          <div>
            <HiUsers className="profileDetailIcons" /> Newly
          </div>
          <div>
            <GoLocation className="profileDetailIcons" /> Tartu, Estonia
          </div>
          <div>
            <AiOutlineMail className="profileDetailIcons" /> abc@gmail.com
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileDetails;
