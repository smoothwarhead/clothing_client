import { useContext, useState } from "react";
import { Api } from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import SessionManager from "../utils/SessionManager";
import { DataContext } from "../context/DataContext";
import useError from "./useError";







const useApi = () => {




    const { setLoggedIn, setUser } = useContext(AuthContext);
    const [open2fa, setOpen2fa] = useState(false);
    const [twoFaEmail, setTwoFaEmail] = useState("");
    const { message, setMessage, setModalOpen, setPending } = useContext(DataContext);

    const { authErrorHandler, dataErrorHandler } = useError();

    const [authMessage, setAuthMessage] = useState("");
    

    

    


    const addStaff = async (data) => {
        
        try {

            const token = SessionManager.getToken();

            let res = await Api.post("/access-auth/business/admin/create-staff", 
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },  
                    
                    withCredentials: true                 
                }
            );

            console.log(res);

            if(res.status === 200){
               
                setMessage({...message, body: res.data.Message, type: res.data.StatusType });
                setModalOpen(true);

            }





            
        } catch (error) {

            let msg = dataErrorHandler(error, "Staff", true);
            setAuthMessage(msg);

            
        }
    }



    const login = async (data) => {

        try {
            
            let res = await Api.post("/login", 
                JSON.stringify(data),
                {
                    headers: { 'Content-Type': 'application/json' }, 

                }
                
            );
                

            if(res.status === 200){
                console.log(res);

                setOpen2fa(res.data.Is2fa);
             
                setTwoFaEmail(res.data.Email);
                
            }
          


        } catch (error) {

           let msg = authErrorHandler(error);
           setAuthMessage(msg);
        }
        
    }


    const twoFaLogin = async (data) => {

        try {

                       
            let res = await Api.post("/login-2FA", 
                JSON.stringify(data),
                {
                    headers: { 'Content-Type': 'application/json' }, 

                }
                
            )
                

            if(res.status === 200){
            
                setLoggedIn(res.data.IsAuth); 
                console.log(res);


                const userName = `${res.data.User.FirstName} ${res.data.User.LastName}`
                SessionManager.setUserSession(res.data.Token, res.data.User.UserId, res.data.IsAuth, res.data.Role[0], userName);

                
            }


        } catch (error) {

            let msg = authErrorHandler(error);

            setAuthMessage(msg);
        }
        
    }


    const changePassword = async (data) => {

        try {

            const token = SessionManager.getToken();
            const user = SessionManager.getUser();

            let res = await Api.post(`/admin/profile/${user}/change-password`, 
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },  
                    
                    withCredentials: true                 
                }
            );
            
           

            if(res.status === 200){
                
                console.log(res);

                if(res.status === 200){
               
                    setMessage({...message, body: res.data.Message, type: res.data.StatusType });
                    setModalOpen(true);
    
                }
                
                
            }


        } catch (error) {

           let msg = dataErrorHandler(error);
           setAuthMessage(msg);
        }
        
    }


    const addAddress = async (data, id) => {

        try {

            // console.log(data);

            const token = SessionManager.getToken();
            

            let res = await Api.put(`/access-auth/business/admin/profile/${id}/update-address`, 
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },  
                    
                    withCredentials: true                 
                }
            );
            
           

            if(res.status === 200){
                
                console.log(res);

                if(res.status === 200){
               
                    setMessage({...message, body: res.data.Message, type: res.data.StatusType });
                    setModalOpen(true);
    
                }
                
                
            }


        } catch (error) {

            let msg = dataErrorHandler(error);
            setAuthMessage(msg);
        }
        
    }


    const logout = async () => {
        

        try {
            
            let res = await Api.get("/logout");

          
            if(res.status === 200){

                setUser(null);
                setLoggedIn(res.data.IsAuth);   
                SessionManager.removeUserSession();            
                
            }


        } catch (error) {
            setLoggedIn(false);            
            SessionManager.removeUserSession();            

        }
        
        
    }



    const createProduct = async (data) => {

        try {

            const token = SessionManager.getToken();
            const user = SessionManager.getUser();
    
    
            
            const imageData = new FormData();

            
            imageData.append('file', data.data);
            imageData.append('upload_preset', "kerryCo");
            imageData.append('cloud_name', "greenietec");

           

            let imgRes = await Api.post("https://api.cloudinary.com/v1_1/greenietec/image/upload", imageData);

            if(imgRes.status === 200){
                

                const prdtData = {

                    productName: data.productName,
                    description: data.description,                    
                    productSlug: data.slug,
                    id: user,                   
                    quantity: data.quantity,
                    unitPrice: parseFloat(data.unitPrice),
                    ImageUrl: imgRes.data.public_id,
                    secureUrl: imgRes.data.secureUrl,
                    url: imgRes.data.url,
                    color: data.color,
                    size: data.size,
                    numberInPack: data.pack,

                };


                // console.log(prdtData);
    
    
                let res = await Api.post(`admin/${user}/products/add-product`,                 
                    
                    JSON.stringify(prdtData),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        withCredentials: true
                    }
                    
                );

                setPending(false);
                console.log(res);
        
                if(res.status === 200){
                    

                    setPending(false);
                    setMessage({...message, body: res.data.Message, type: res.data.StatusType });
                    setModalOpen(true);

                    
        
                }




            }


            
        } catch (error) {

            setPending(false);

            let msg = dataErrorHandler(error, "product", true);

            setMessage({...message, body: msg, type: "error" });
            setModalOpen(true);

            
            
        }








    }


    const editProduct = async (data) => {

        try {

            const token = SessionManager.getToken();
            const user = SessionManager.getUser();
    
    
            
            const imageData = new FormData();

            
            imageData.append('file', data.data);
            imageData.append('upload_preset', "skol-stained-glass");
            imageData.append('cloud_name', "greenietec");


            let imgRes = await Api.post("https://api.cloudinary.com/v1_1/greenietec/image/upload", imageData);

            if(imgRes.status === 200){



                const prdtData = {

                    productName: data.productName,
                    description: data.description,
                    quantity: data.quantity,
                    unitPrice: parseFloat(data.unitPrice),
                    productSlug: data.slug,
                    id: user,
                    publicId: imgRes.data.public_id,
                    secureUrl: imgRes.data.secureUrl,
                    url: imgRes.data.url,
                    dimensions: data.dimensions

                };

    
    
                let res = await Api.post(`access-auth/business/admin/${user}/products/add-product`,                 
                    
                    JSON.stringify(prdtData),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        withCredentials: true
                    }
                    
                );

                setPending(false);
                console.log(res);
        
                if(res.status === 200){
                    

                    setPending(false);
                    setMessage({...message, body: res.data.Message, type: res.data.StatusType });
                    setModalOpen(true);

                    
        
                }




            }


            
        } catch (error) {

            setPending(false);

            let msg = dataErrorHandler(error, "product", true);

            setMessage({...message, body: msg, type: "error" });
            setModalOpen(true);

            
            
        }








    }



    return {  
        logout, 
        login, 
        twoFaLogin,
        addStaff, 
        message, 
        open2fa, 
        setOpen2fa,
        twoFaEmail, 
        setTwoFaEmail,
        changePassword,
        addAddress,
        authMessage,
        createProduct,
        editProduct
    }

}

export default useApi;