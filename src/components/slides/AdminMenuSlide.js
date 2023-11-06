import React, { useContext, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom';
import { sideNav } from '../../utils/SideItems';
import { gsap, Power1 } from 'gsap';
import './slides.css';
import NavContext from '../../context/NavContext';







const AdminMenuSlide = () => {

    const { slideAdminMenu, setSlideAdminMenu } = useContext(NavContext);
    

    const aMenuRef = useRef();
    const containerRef = useRef();

   const tl = useRef();


    useEffect(() => {
            
            tl.current = gsap.timeline({ paused: true });

            tl.current.to(containerRef.current, {
                display: "block",
                duration: 0,
                ease: Power1.easeInOut
            });

            tl.current.to(aMenuRef.current, {
                left: 0,
                duration: 0.7,
                ease: Power1.easeInOut
            });

            


    }, [])




   useEffect(() => {
        
        slideAdminMenu ? tl.current.play() : tl.current.reverse()



   }, [slideAdminMenu]);


  return (
    <div className='slide-container' ref={containerRef}>
        <div className="mobile-menu-container admin-menu" ref={aMenuRef}>
            <div className="m-header">
                <div className="m-header-left"></div>
                <div className="m-header-right" onClick={() => setSlideAdminMenu(false)}>Close</div>
            </div>

            <div className="m-nav-body">
                
                <div className="m-nav-body-el">
                    {
                        sideNav.map((item, index) => (
                        <NavLink
                            to={item.to}
                            key={index}
                            onClick={() => setSlideAdminMenu(false)}
                        >
                            {item.name}
                        </NavLink>
                    ))
                    }
                </div>
                

            </div>


        </div>
    </div>
  )
}

export default AdminMenuSlide