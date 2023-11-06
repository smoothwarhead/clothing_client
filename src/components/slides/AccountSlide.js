import '../../styles/slides.css';
import '../../styles/account.css';
import { HiX } from 'react-icons/hi';
import { useRef, useEffect, useContext, useState } from 'react';
import { gsap, Power1 } from 'gsap';
import ForgotSlide from './ForgotSlide';
import { Link } from 'react-router-dom';
import NavContext from '../../context/NavContext';
import FormInput from '../forms/FormInput';
import usePasswordToggle from '../../hooks/usePasswordToggle';
import { signInInputs } from '../../files/inputs';

const initialValues = {
    email: "",
    password: ""
}

const AccountSlide = () => {

    const accountRef = useRef(null);
    const containerRef = useRef(null);

    const [values, setValues] = useState(initialValues);

    const [error, setError] = useState(false);



    const { slideAccount, setSlideAccount, setSlideForgot} = useContext(NavContext);

    const {InputType, Icon} = usePasswordToggle();

   

    const tl = useRef();


    useEffect(() => {
        
        tl.current = gsap.timeline({ paused: true });

        tl.current.to(containerRef.current, {
            display: "block",
            duration: 0,
            ease: Power1.easeInOut
        });

        tl.current.to(accountRef.current, {
            right: 0,
            duration: 0.5,
            ease: Power1.easeInOut
        });
        


    }, [])


    useEffect(() => {
        
     slideAccount ? tl.current.play() : tl.current.reverse();



    }, [slideAccount]);


    const handleForgotClick = () => {
        if(slideAccount){
            setSlideAccount(false);
          }
      
          setSlideForgot(true);
    }


    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value});
    }


    const handleSubmit = () => {
        // e.preventDefault();

        if(values.email === "" || values.password === ""){
            setError(true);
        }
        
      
        else{
            console.log(values);
        }


    }

    

  return (
    <>
        <ForgotSlide />
        <div className='slide-container' ref={containerRef}>
            <div 
                className="account-slide" 
                ref={accountRef}
            >


                <div className="account-slide-hdr">
            
                    <HiX 
                        className='close-icon'
                        onClick={() => setSlideAccount(false)}
                        
                    />
                
                </div>

                <div className="account-container">
                    <div className="act-title">Sign In</div>
                    <div className="inp-container">


                        {
                            signInInputs.map((input, index) => (
                                <FormInput 
                                    key={index}
                                    inputType={input.name === "email" ? "email" : !input.name === "email" && !input.isPassword ? "text" : InputType}
                                    {...input}
                                    icon={!input.isPassword ? null : Icon}    
                                    value={values[input.name]} 
                                    handleChange={handleChange}  
                                    isPassword={input.isPassword}
                                    errorMessage = {input.errorMessage}
                                    error = {error}
                                    cName = "input"

                                />
                            ))
                        }


                    </div>

                    <div className="forget-password" onClick={handleForgotClick}>Forgot Password?</div>

                    <div className="sign-in-btn" onClick={handleSubmit}>Sign in</div>

                    <div className="no-act-link">
                        <span>Don't have an account?</span>
                       <Link to="/register" onClick={() => setSlideAccount(false)}><span className='create-link'>Create Account</span></Link> 
                    </div>
                </div>


            </div>
        </div>
    
    </>
  )
}

export default AccountSlide;