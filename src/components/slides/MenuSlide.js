import { useContext, useEffect, useRef } from 'react';
import '../../styles/slides.css'
import NavContext from '../../context/NavContext';
import { gsap, Power1 } from 'gsap';
import { NavLink,Link } from 'react-router-dom';
import { navItems } from '../navigation/navItems';
import AccountSlide from './AccountSlide';


const MenuSlide = () => {

    const { setSlideAccount, slideMenu, setSlideMenu } = useContext(NavContext);




     const menuRef = useRef();
     const containerRef = useRef();

    const tl = useRef();

 


    useEffect(() => {
        
        tl.current = gsap.timeline({ paused: true });

        tl.current.to(containerRef.current, {
            display: "block",
            duration: 0,
            ease: Power1.easeInOut
        });

        tl.current.to(menuRef.current, {
            left: 0,
            duration: 0.5,
            ease: Power1.easeInOut
        });

               


    }, [])


    useEffect(() => {
        
     slideMenu ? tl.current.play() : tl.current.reverse()



    }, [slideMenu]);


    const handleSignInClick = () => {
        if(slideMenu){
            setSlideMenu(false);
          }
      
          setSlideAccount(true);
      
    }


  return (
    <>
        <AccountSlide />
        <div className='slide-container' ref={containerRef}>
            <div className="mobile-menu-container site-menu" ref={menuRef}>
                <div className="m-header">
                    <div className="m-header-left"></div>
                    <div className="m-header-right" onClick={() => setSlideMenu(false)}>Close</div>
                </div>

                <div className="m-nav-body">
                    
                    <div className="m-nav-body-el">
                        {
                        navItems.map((item, index) => (
                            <NavLink
                                to={item.to}
                                key={index}
                            >
                                {item.name}
                            </NavLink>
                        ))
                        }
                    </div>
                    

                </div>

                <div className="m-account-el">
                    <div className="m-account-el-links" onClick={handleSignInClick}>Sign in</div>
                    <Link to="/register" onClick={() => setSlideMenu(false)}><div className="m-account-el-links">Create Account</div></Link>
                </div>


            </div>
        </div>
    </>
  )
}

export default MenuSlide