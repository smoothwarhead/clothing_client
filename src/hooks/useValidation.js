
const useValidation = () => {
    
    

    const validations = (values) => {
        let errors = {};

        const hasFirstName = 'firstName' in values;
        const hasLastName = 'lastName' in values;


        if(hasFirstName || hasLastName){
            //first name
            if(!values.firstName.trim()){
                errors.firstName = 'Please enter a first name';
            }

            //last name
            if(!values.lastName.trim()){
                errors.lastName = 'Please enter a last name';
            }
        }      
    
        //email
        if (!values.email){
            errors.email = 'Please enter a valid email address';
        }
        else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
            errors.email = 'Please enter a valid email address';
        }
    
        //password
        if(!values.password){
            errors.password = 'The password field cannot be empty.`);';
        }
        else if(values.password.length < 6){
            errors.password = 'Password must contain between 6 and 60 characters'
        }
    
           
        return errors;
    
    }

    return {validations}

}

export default useValidation;