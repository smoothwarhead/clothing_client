import React, { useContext, useEffect, useRef } from 'react'
import NavContext from '../../context/NavContext';
import { gsap, Power1 } from 'gsap';
import { Link } from 'react-router-dom';
import './slides.css';
import { AuthContext } from '../../context/AuthContext';
import useApi from '../../hooks/useApi';


const AdminProfileSlide = () => {

    const {slideProfile, setSlideProfile } = useContext(NavContext);
    const { user } = useContext(AuthContext);
    const { logout } = useApi();

    const pSlideRef = useRef();
    const pContainerRef = useRef();

    const tl = useRef();

    useEffect(() => {

        tl.current = gsap.timeline({ paused: true });

        tl.current.to(pContainerRef.current, {
            display: "block",
            duration: 0,
            ease: Power1.easeInOut
        });


        tl.current.to(pSlideRef.current, {
            display: "block",
            top: "8vh",
            duration: 0.1,
            ease: Power1.easeInOut
        });

    }, []);


    useEffect(() => {

       
        
        slideProfile ? tl.current.play() : tl.current.reverse()
   
   
   
    }, [slideProfile]);


    const handleLogout = () => {
        logout();
    }

    const handleProfileClick = () => {
        setSlideProfile(false);
    }







  return (

    <>
        <div className='profile-slide-container' ref={pContainerRef}>

            <div className="profile-slide" ref={pSlideRef}>
                
                <Link 
                    to={`/admin/profile/${user}`}
                    onClick={handleProfileClick}
                >
                    Account
                </Link>

                <span onClick={handleLogout}>Logout</span>


            </div>
        </div>
        
    </>
    
  )
}

export default AdminProfileSlide