import React, { useContext, useRef, useEffect } from 'react'
import NavContext from '../../context/NavContext';
import { gsap, Power1 } from 'gsap';
import { HiX } from 'react-icons/hi';


const AdminSearchSlide = () => {

    const { slideAdminSearch, setSlideAdminSearch} = useContext(NavContext);

    const adminSearchRef = useRef(null);
    const tl = useRef();




    useEffect(() => {

        
        tl.current = gsap.timeline({ paused: true });


        tl.current.to(adminSearchRef.current, {
            top: 0,
            duration: 0.7,
            ease: Power1.easeInOut
        });

    }, []);


    useEffect(() => {

        // slideSearch ? searchInputRef.current.focus() : searchInputRef.current.blur();
        
        slideAdminSearch ? tl.current.play() : tl.current.reverse()
   
   
   
    }, [slideAdminSearch])


  return (
    <>
     <div className="admin-search-slide" ref={adminSearchRef}>
            
            <div className="m-ad-search-bar">
                <input type="text"  className='m-ad-search-input' placeholder='What are you looking for...' autoFocus />

            </div>

            <HiX 
                className='search-close-icon'
                onClick={() => setSlideAdminSearch(false)}
                    
            />

         
        </div>
       
    </>
  )
}

export default AdminSearchSlide