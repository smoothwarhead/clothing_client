import { useRef, useEffect, useContext } from 'react';
import { gsap, Power1 } from 'gsap';
import { HiX, HiSearch } from 'react-icons/hi';
import NavContext from '../../context/NavContext';


const SearchSlide = () => {


    const { slideSearch, setSlideSearch} = useContext(NavContext);

    const searchRef = useRef(null);
    const containerRef = useRef(null);
    const tl = useRef();


    // useEffect(() => {
    //     searchInputRef.current.focus();
    // }, []);


    useEffect(() => {

        
        tl.current = gsap.timeline({ paused: true });

        tl.current.to(containerRef.current, {
            display: "block",
            duration: 0,
            ease: Power1.easeInOut
            
        });

        tl.current.to(searchRef.current, {
            top: 0,
            duration: 0.2,
            ease: Power1.easeInOut
        });

    }, []);


    useEffect(() => {

        // slideSearch ? searchInputRef.current.focus() : searchInputRef.current.blur();
        
        slideSearch ? tl.current.play() : tl.current.reverse()
   
   
   
    }, [slideSearch])




  return (
    <div className="search-slide-container" ref={containerRef}>
        <div className="search-slide" ref={searchRef}>
            <HiSearch 
                className='search-icon'
                
                    
            />
            <div className="search-bar">
                <input type="text" className='site-search-input' placeholder='What are you looking for...' autoFocus />
            </div>

            <HiX 
                className='search-close-icon'
                onClick={() => setSlideSearch(false)}
                    
            />

         
        </div>
    </div>
  )
}

export default SearchSlide;