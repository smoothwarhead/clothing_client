import { useContext } from 'react';
import useFetch from '../../hooks/useFetch';
import './profile.css';

import { AuthContext } from '../../context/AuthContext';
import ContactCard from '../../components/cards/profile-cards/ContactCard';
import ProfileCard from '../../components/cards/profile-cards/ProfileCard';



const noDataMsg = "Unable to retrieve your profile at the moment";








const Profile = () => {



    const {user} = useContext(AuthContext);
   
    const {data: admin } = useFetch(`/admin/profile/${user}`);



  return (
    <>
        <div className="profile-page">

            {
                admin === null ? <span className="no-data">{noDataMsg}</span>
                :

        
                <>
                    <div className="profile-el profile-section">
                        <ProfileCard title="Profile" admin={admin}/>
                    </div>


                    <div className="profile-el contact-section">

                        <ContactCard title="Contact" admin={admin}/>


                    </div>
{/* 
                    <div className="profile-el address-section">
                        <ProfileAddressCard title="Address" admin={admin} />
                    </div> */}

                </>


            }

            
        </div>
    </>
  )
}

export default Profile