import React, { useState } from 'react'
import ChangePasswordModal from '../../modals/ChangePasswordModal';
import Modal from '../../modals/Modal';
import './profile-cards.css';





const ContactCard = (props) => {

    const { title, admin } = props;

    const [openPass, setOpenPass] = useState(false);


    const formatEmail = (email) => {


        if(!email){
            return null;
        }
      
        const [name, domain] = email.split('@');
        const firstChar = name[0];
        const secondChar = name[name.length - 1];
  
        const newEmail = `${firstChar}${new Array(name.length).join('*')}${secondChar}@${domain}`;

        return newEmail;
        
    }

    const formatNumber = (str) => {

        if(!str){
            return null;
        }


        let newStr;
        let phoneDigit;
        if(str.trim().length > 10){
            newStr = str.substr(1, str.length - 1);
            
            phoneDigit = `${newStr.substr(0, 3)}-${newStr.substr(3, 3)}-${newStr.substr(6, 4)}`;
            return phoneDigit;


        }
        phoneDigit = `${str.substr(0, 3)}-${str.substr(3, 3)}-${str.substr(6, 4)}`;
        return phoneDigit;

        
       
    }

    const handlePassClick = () => {
        setOpenPass(false);
    }


  return (
    <>
        {  openPass &&
            <Modal           
                modalBody={ <ChangePasswordModal closeModal = {handlePassClick} /> }
                modalType="form"
                closeModal={handlePassClick}

            />
        }
        <div className="profile-el-con">

            <div className="profile-el-left">
                <div className="profile-el-title">{title}</div>

                <div className="profile-el-text">
                    <div className="profile-el-text-con profile-el-text-tp">
                        <div className="profile-el-text-con-lbl">Email:</div>
                        <div className="profile-el-text-con-txt">{!admin ? "Loading" : formatEmail(admin.User?.Email)}</div>
                    </div>
                    {/* <div className="profile-el-text-con profile-el-text-btm"></div> */}
                </div>

            </div>
        

        </div>

        <div className="profile-el-pwd-con">
            <div className="profile-el-text-con profile-el-text-pwd">
                <div className="profile-el-text-con-lbl">Password:</div>
                <div className="profile-el-text-con-txt">{new Array(admin.User?.Email.length).join('*')}</div>
            </div>


            <div className="profile-el-right">
                <div 
                    className="profile-el-edit-btn"
                    onClick={() => setOpenPass(true)}
                >
                    Edit/Change
                </div>
                
            </div>
                        
        </div>

        <div className="profile-el-text-con profile-el-text-tp">
            <div className="profile-el-text-con-lbl">Pnone Number:</div>
            <div className="profile-el-text-con-txt">{!admin ? "Loading" : formatNumber(admin.User?.PhoneNumber ?? "")}</div>
        </div>
         
    </>
  )
}

export default ContactCard