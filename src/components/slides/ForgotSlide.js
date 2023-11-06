import '../../styles/slides.css';
import '../../styles/account.css';
import { HiX } from 'react-icons/hi';
import { useRef, useEffect, useContext, useState } from 'react';
import { gsap, Power1 } from 'gsap';
import NavContext from '../../context/NavContext';
import { forgotInputs } from '../../files/inputs';
import FormInput from '../forms/FormInput';



const ForgotSlide = () => {


    const { slideForgot, setSlideForgot } = useContext(NavContext);

    const [error, setError] = useState(false);
    const [values, setValues] = useState({
        email: ""
    });



    const forgotRef = useRef(null);
    const containerRef = useRef(null);


    const tl = useRef();

    
    useEffect(() => {
        
        tl.current = gsap.timeline({ paused: true });

        tl.current.to(containerRef.current, {
            display: "block",
            duration: 0,
            ease: Power1.easeInOut
        });

        tl.current.to(forgotRef.current, {
            right: 0,
            duration: 0.5,
            ease: Power1.easeInOut
        });
        


    }, []);


    useEffect(() => {
        
     slideForgot ? tl.current.play() : tl.current.reverse()



    }, [slideForgot]);


    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value});
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(values.email === ""){
            setError(true);
        }
        
        // if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
        //     setError(true);
        // }
        else{
            console.log(values);
        }


    }

  return (

    <>
        {/* <AccountSlide /> */}
        <div className='slide-container' ref={containerRef}>
            <div 
                className="account-slide" 
                ref={forgotRef}
            >


                <div className="account-slide-hdr">
            
                        <HiX 
                            className='close-icon'
                            onClick={() => setSlideForgot(false)}
                            
                        />
                
                </div>

                <div className="account-container">
                    <div className="act-title">Forgot Password?</div>

                    <div className="forget-text">Please enter your email address below and we will send you a link to reset your password.</div>

                    <div className="inp-container">
                        {
                            forgotInputs.map((input, index) => (
                                <FormInput 
                                    key={index}
                                    inputType="text"
                                    {...input}
                                    // icon={!input.isPassword ? null : Icon}   
                                    value={values[input.name]} 
                                    handleChange={handleChange}  
                                    isPassword={input.isPassword}
                                    errorMessage = {input.errorMessage}
                                    error = {error}
                                    cName="input"
                                />
                            ))
                        }
                        {/* <input type="text" className="inp-el" placeholder='Email*' /> */}
                    </div>


                    <div className="sign-in-btn" onClick={handleSubmit}>Send Link</div>

                   
                </div>


            </div>
        </div>
    </>
  
  )
}

export default ForgotSlide