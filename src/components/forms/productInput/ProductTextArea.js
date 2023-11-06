import { useState } from "react";
import './productInput.css';



const ProductTextArea = (props) => {

    const [focused, setFocused] = useState(false);
    const [touched, setTouched] = useState(false);


    const { value, handleChange, error } = props;

    const isValid = value !== "";

    const handleTouched = () => {
        setFocused(false);
        setTouched(true);
       
    }
    
    const handleFocus = () => {
    setFocused(true);
        
    }



  return (
    <>
        <div className='product-input-control'>
            <label className="product-input-lbl">{"Product description (required)"}</label>
            
            <textarea 
                className={`product-textarea ${(focused) ? "focused" : (touched && !isValid) || (error && !isValid) ? "inp-error" : ""}`}
                // placeholder="Provide additional description/information about the class" 
                cols="105" 
                rows="15"
                value={value}
                onBlur={handleTouched}
                onFocus={handleFocus}
                onChange={handleChange}
            ></textarea>

            { (touched && !isValid) || (error && !isValid) ? <span className="product-inp-error-msg">Product description is required.</span> : <div></div> }

            
        </div>
    
    </>
  )
}

export default ProductTextArea