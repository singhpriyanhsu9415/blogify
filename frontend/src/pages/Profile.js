import React from 'react'
import { FaUser, FaLock, FaCamera } from 'react-icons/fa';

function Profile () {
    return ( 
        <div className="m-5 " >
        <h1 className="profile-title text-center">Update Profile</h1>
        <div className='d-flex' style={{justifyContent:"center",alignItems:"center"}}>
        <form className="profile-form "  >
          <div className="profile-image-section m-1">
            <label htmlFor="profileImage" className="profile-image-label m-2">
             
              <FaCamera className="profile-camera-icon" />
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              
              className="profile-image-input"
            />
          </div>
  
          <div className="input-group  ">
            <FaUser className="input-icon " />
            <input
              type="text"
              placeholder="Update Name"
              
              className="profile-input"
            />
          </div>
  
          <div className="input-group  ">
            <FaLock className="input-icon " />
            <input
              type="password"
              placeholder="Old Password"
              
              className="profile-input"
            />
          </div>
  
          <div className="input-group  ">
            <FaLock className="input-icon " />
            <input
              type="password"
              placeholder="New Password"
              
              className="profile-input"
            />
          </div>
  
          <button type="submit" className="profile-button m-3">Update Profile</button>
        </form>
        </div>
      </div>
     );
}

export default Profile;