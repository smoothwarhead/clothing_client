import { useContext } from "react";
import SessionManager from "../utils/SessionManager";
import { AuthContext } from "../context/AuthContext";





const useError = () => {


    // const [authError, setAuthError] = useState(false);
    // const [authMessage, setAuthMessage] = useState("");

    const { setLoggedIn } = useContext(AuthContext);

    







    const authErrorHandler = (error) => {

       let msg;


    
        if(error.response.status === 400){
        
            msg =  error.response.data.Message; 
            return msg;             
        }

        if(error.code === "ERR_BAD_REQUEST"){

            setLoggedIn(false);
            
            SessionManager.removeUserSession();

            msg =  error.response.data.Message; 
            return msg;   
                        
        }

        if(error.response.status === 401){

            setLoggedIn(false);
            SessionManager.removeUserSession();
            
            msg =  "User not authorized. Please provide the correct email and password"; 
            return msg;   
                        
        }

        if(error.response.status === 403){

            setLoggedIn(false);   
            SessionManager.removeUserSession();

            
            msg =  "User forbidden to view this page. Please provide the correct email and password"; 
            return msg; 


        }

        if(error.response.status === 404){
           
            msg =  "User does not exist. Please provide the correct email and password"; 
            return msg; 
            
        }

        if(error.response.status === 500){
            
            msg =  "Incorrect email or password combination !!!"; 
            return msg; 
            
        }

        if(error.response.status === 503 || error.code === "ERR_NETWORK"){
           
            msg =  "Inconsistent network !!!"; 
            return msg;
            
        }


            
    }


    const dataErrorHandler = (error, entity, post) => {

        console.log(error);
        let msg;


    
        if(error.response.status === 400){
        
            msg =  error.response.data.Message; 
            return msg;             
        }

        if(error.code === "ERR_BAD_REQUEST"){


            msg =  post ? `${entity} could not be created/updated at the moment. please check the credentials`  : "This page can not be found";
            return msg;   
                        
        }

        if(error.response.status === 401){

            setLoggedIn(false);
            SessionManager.removeUserSession();
            
            msg =  "User not authorized. Please provide the correct credential"; 
            return msg;   
                        
        }

        if(error.response.status === 403){

            setLoggedIn(false);   
            SessionManager.removeUserSession();

            
            msg =  "User forbidden to view this page. Please provide the correct credential"; 
            return msg; 


        }

        if(error.response.status === 404){
           
            msg =  "This page can not be found"; 
            return msg; 
            
        }

        if(error.response.status === 500){
            
            msg =  "This is an invalid request"; 
            return msg; 
            
        }

        if(error.response.status === 503 || error.code === "ERR_NETWORK"){
           
            msg =  "Inconsistent network !!!"; 
            return msg;
            
        }

    }



    return {

        authErrorHandler,
        dataErrorHandler,
        
    }

}

export default useError;