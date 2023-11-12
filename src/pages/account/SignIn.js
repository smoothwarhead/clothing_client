import React, { useContext, useState } from 'react'
// import { Link } from 'react-router-dom';
import './account.css';
import { signInInputs, twoFaInputs } from '../../utils/inputs';
import usePasswordToggle from '../../hooks/usePasswordToggle';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import FormInput from '../../components/forms/formInput/FormInput';
import useApi from '../../hooks/useApi';
import { hasEmptyKey } from '../../utils/methods';






const initialValues = {
    email: "",
    password: ""
}
const initialTwoFaValues = {
    code: ""
}

const SignIn = () => {

    const { loggedIn } = useContext(AuthContext);

    const { InputType, Icon } = usePasswordToggle();
    const { open2fa, twoFaEmail,submitting, setSubmitting,  login, twoFaLogin, authMessage } = useApi();

    const [values, setValues] = useState(initialValues);
    const [twoFavalue, setTwoFaValue] = useState(initialTwoFaValues);

    const [error, setError] = useState(false);

    
    



    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value});
        
    }

    const handleTwoFaChange = (e) => {
        setTwoFaValue({ ...twoFavalue, [e.target.name]: e.target.value});
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(hasEmptyKey(values)){
            setError(true);
        }
        
        else{
            login(values);
        }


    }

    const handleTwoFaSubmit = (e) => {
        e.preventDefault();

        if(twoFavalue.code === ""){
            setError(true);
        }
        
        else{
            const twoFaData = {
                code: twoFavalue.code,
                email: twoFaEmail
                
            }

            twoFaLogin(twoFaData);
        }


    }


    if(loggedIn){
        return <Navigate to="/admin"/>
    }



  return (

    <>
        <div className='account-body'>


            
            <div className="admin-acc-container">

                {
                    !submitting ?

                    <>

                        {/* {authError && <span className='auth-error'>{authMessage}</span>} */}
                        {authMessage && <span className='auth-error'>{authMessage}</span>}

                        {!open2fa ?
                            <div className="log">
                                <div className="login">Login</div>
                                <div className="log-info">
                                    <h3>Please enter your email and password</h3>
                                    <form className='log-el' onSubmit={handleSubmit}>

                                        {
                                            signInInputs.map((input, index) => (

                                                <FormInput 
                                                    key={index }
                                                    inputType={!input.isPassword ? "text" : InputType}
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
                                    
                                        <button>Login</button>
                                    </form>
                                    {/* <p>Don't have account? <Link href="sign-up.html">create an account</Link></p> */}
                                </div>
                            </div>
                            :
                            <div className="log">
                                
                                <div className="fa-log-info">
                                    
                                    <span>Please enter the OTP sent to your email address.</span>
                                    <form onSubmit={handleTwoFaSubmit}>

                                        {
                                            twoFaInputs.map((input, index) => (
                                                <FormInput 
                                                    key={index}
                                                    inputType={!input.isPassword ? "text" : InputType}
                                                    {...input}
                                                    icon={!input.isPassword ? null : Icon}    
                                                    value={values[input.name]} 
                                                    handleChange={handleTwoFaChange}  
                                                    isPassword={input.isPassword}
                                                    validate={input.validate}
                                                    errorMessage = {input.errorMessage}
                                                    error = {error}
                                                    cName = "input"
                                                />
                                            ))
                                        }
                                    
                                        <button>Login</button>
                                    </form>
                                    
                                </div>
                            </div>

                        }
                    </>


                    :

                    <div className="login-verification">
                        <span className='login-verification-el'>Please wait while we verify your credentials</span>

                    </div>


                }

            </div>
        </div>
    </>
  )
}

export default SignIn;