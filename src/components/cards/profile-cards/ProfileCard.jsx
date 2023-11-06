import React from 'react'
import './profile-cards.css';

const ProfileCard = ({ title, admin }) => {
  return (
    <>
        <div className="profile-el-con">

            <div className="profile-el-left">
                <div className="profile-el-title">{title}</div>

                <div className="profile-el-text">
                    <div className="profile-el-text-con profile-el-text-tp">
                        <div className="profile-el-text-con-lbl">Name:</div>
                        <div className="profile-el-text-con-txt">{!admin ? "Loading" : `${admin?.FirstName} ${admin?.LastName}`}</div>
                    </div>
                    {/* <div className="profile-el-text-con profile-el-text-btm"></div> */}
                </div>
            </div>

    

        </div>
    
    </>
  )
}

export default ProfileCard