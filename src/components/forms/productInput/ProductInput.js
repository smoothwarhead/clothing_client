import { useState } from 'react';
import './productInput.css';





const ProductInput = (props) => {

  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);


  const {cName, error, hint, inputType, isNum, errorMessage, handleChange, ...inputProps} = props;

  const isValid = inputProps.value !== "";


  const handleTouched = () => {
    setFocused(false);
    setTouched(true);
   
  }

  const handleFocus = () => {
    setFocused(true);
        
  }

  return (
    <div className='product-input-control'>

        <label className="product-input-lbl">{props.label}</label>
        {hint && <span className="product-input-hint">{hint}</span>}

        <input 
            type={inputType} 
            onChange={handleChange}
            {...inputProps}
            onBlur={handleTouched}
            onFocus={handleFocus}
            className={`${cName} ${(focused) ? "focused" : (touched && !isValid) || (error && !isValid) ? "inp-error" : ""}`}
            
        />

        { (touched && !isValid) || (error && !isValid) ? <span className="product-inp-error-msg">{errorMessage}</span> : <div></div> }


    </div>
  )
}

export default ProductInput;