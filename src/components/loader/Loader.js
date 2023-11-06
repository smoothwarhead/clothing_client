import { useEffect, useRef } from 'react';
import './loader.css';
// import SplitType from 'split-type';
import { gsap } from "gsap";




const Loader = () => {

    // const tl = useRef();


    

    // useEffect(() => {
    //     const loadingText = SplitType.create('.loading-text');


	// 	tl.current = gsap.timeline({ defaults: {repeat: -1, repeatDelay: 1, ease: "power4.inOut"}});

    //     tl.current.from(loadingText.chars, {
    //         yPercent: -130,
    //         stagger: 0.05,
    //         duration: 1,
    //         opacity: 0
    //     })

    // }, [])

  return (
    <div className="loader-con">
        <div className="loading-text">
            Kerry co
        </div>
    </div>
  )
}

export default Loader;