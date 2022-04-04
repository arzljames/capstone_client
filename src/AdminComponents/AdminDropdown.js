import React from 'react'
import {
    IoPersonOutline,
    IoSettingsOutline,
    IoExitOutline,
    IoBookOutline,
    IoCodeSlash,
  } from "react-icons/io5";

const AdminDropdown = ({submitLogout}) => {
  return (
    <div 
            className="profile-container-dropdown"
          >
            <ul>
              <li>
                <p>
                  <IoPersonOutline />
                </p>
                Your Profile
              </li>
              <li>
                <p>
                  <IoSettingsOutline />
                </p>
                Account Settings
              </li>
            </ul>
            <ul>
              <li>
                <p>
                  <IoCodeSlash />
                </p>
                About
              </li>
              <li>
                <p>
                  <IoBookOutline />
                </p>
                User Guide
              </li>
            </ul>
            <ul style={{ border: "none" }}>
              <li onClick={() => submitLogout()}>
                <p>
                  <IoExitOutline />
                </p>
                Sign Out
              </li>
            </ul>
          </div>
  )
}

export default AdminDropdown