import React, { useContext, useEffect, useState } from 'react';
import '../addProducts/addProducts.css';
import './selected-product.css';
import Button from '../../components/buttons/Button';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { Navigate, useParams } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';
import Loader from '../../components/loader/Loader';
import SessionManager from '../../utils/SessionManager';
import useError from '../../hooks/useError';
import { Api } from '../../api/axios';
import useApi from '../../hooks/useApi';
import Modal from '../../components/modals/Modal';
import ConfirmationPage from '../../components/modals/ConfirmationPage';











const SelectedProduct = () => {

    const { id } = useParams();

 
    const { dataErrorHandler } = useError();

    const [gotoEditProduct, setGotoEditProduct] = useState(false);


    const {deleteProduct} = useApi();




    // const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [productImage, setProductImage] = useState("");
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [pack, setPack] = useState("");

    const { pending, setPending, setModalOpen, message, setMessage, deleteMode, setDeleteMode } = useContext(DataContext);


  
    useEffect(() => {



        const getData = async () => {


            // const emptyData = [];

            const token = SessionManager.getToken();


                    

            try {

                let res = await Api.get(`/admin/products/product/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                       
                    },

                    withCredentials: true

                    
                    
                });

                setPending(true);

                console.log(res);

                if(res.status === 200){

                    const product = res.data;

                    console.log(product.Variations[0].ImageUrl);
                
                    
   

                    if(product.length === 0){
                        return;
                    }else{

                        // setProductId(product.ProductId);
                        setProductImage(product.Variations[0].ImageUrl);
                        setColor(product.Variations[0].Color);
                        setSize(product.Variations[0].Size);
                        setQuantity(product.Variations[0].Quantity);
                        setPack(product.Variations[0].NumberInPack);
                        setUnitPrice(product.Variations[0].UnitPrice);
                        setProductName(product.ProductName);
                        setDescription(product.ProductDescription);
                        // setItemQuantity(product.Quantity);
                        // setItemPrice(product.UnitPrice);
                        setPending(false);   
                                  

                    }

                     
                    
                }else if(res.status === 401){
                    
                    SessionManager.removeUserSession();                  
                    
                }
                else{
                    throw Error("Could not fetch the data for that resource");
                }

                
            } catch (error) {
               
                setPending(false);

                let msg = dataErrorHandler(error, "product", true);
    
                setMessage({...message, body: msg, type: "error" });
                setModalOpen(true);

            
            }
        }

        getData();

    }, [id, setPending, setModalOpen, message, setMessage, dataErrorHandler]);







    const editProduct = () => {
        setGotoEditProduct(true);
        // navigate(`/admin/products/edit-product/${id}`);
    }


    if(gotoEditProduct){
        return <Navigate to={`/admin/products/edit-product/${id}`} />
    }

  

     // Create and configure your Cloudinary instance.
     const cld = new Cloudinary({
        cloud: {
            cloudName: 'greenietec'
        }
    }); 

    // Use the image with public ID.
    const myImage = cld.image(productImage);

    // Scale the image to a width of 400 pixels.
    // myImage.resize(scale().width(40).height(30));


    const handleDelete = () => {
        const msg = "Are you sure you want to delete this product?"
        setMessage({...message, body: msg, type: "error" });
        setDeleteMode(true);
       
    }

    const handleOk = () => {
        
        deleteProduct(id);
       

    }


    const handleCloseModal = () => {
        setModalOpen(false);
        setDeleteMode(false);
    }


  return (
    <>
        { deleteMode &&
            <Modal                     
                modalBody={ <ConfirmationPage handleOk={handleOk} doubleBtn={true} /> }
                modalType={message.type}
                closeModal={handleCloseModal}
                
            />
        }
       
        {pending && <Loader />}

        {!pending &&
            <div className="dash-page">

                <div className="selected-page-top">
                

                    <div className="selected-page-btns">

                        <Button 
                            hasIcon={false} 
                            btnText= "Edit Product"
                            action={editProduct}
                            isActive={true}
                            Icon={null}

                        />

                        <Button 
                            hasIcon={false} 
                            btnText= "Delete Product"
                            action={handleDelete}
                            isActive={true}
                            Icon={null}

                        />

                    </div>
                    
                </div>


                
                <div className="selected-container">


                    <div className="selected-container-left">

                        <div className="selected-product-name">{productName}</div>


                        <div className="selected-product-elements selected-product-image">
                            <div className="selected-prdt-img">
                                <AdvancedImage style={{maxWidth: '100%', maxHeight: '100%'}} cldImg={myImage}/>                    
                            </div>

                        </div>



                        <div className="selected-product-elements selected-product-title-qty">
                            <div className="selected-product-elements-left">
                                Quantity:
                            </div>

                            <div className="selected-product-elements-right">
                                {quantity}

                            </div>
                        </div>


                        <div className="selected-product-elements selected-product-title-price">
                            <div className="selected-product-elements-left">
                                Price:
                            </div>

                            <div className="selected-product-elements-right">
                                {`$${parseFloat(unitPrice).toFixed(2).toString()}`}

                            </div>  
                        
                        </div>

                        <div className="selected-product-elements selected-product-title-price">
                            <div className="selected-product-elements-left">
                                Color:
                            </div>

                            <div className="selected-product-elements-right">
                                {color}

                            </div>  
                        
                        </div>


                        <div className="selected-product-elements selected-product-title-price">
                            <div className="selected-product-elements-left">
                                Size:
                            </div>

                            <div className="selected-product-elements-right">
                                {size}

                            </div>  
                        
                        </div>

                        <div className="selected-product-elements selected-product-title-price">
                            <div className="selected-product-elements-left">
                                Pack:
                            </div>

                            <div className="selected-product-elements-right">
                                {pack}

                            </div>  
                        
                        </div>

                        <div className="spacer"></div>



                    </div>



                    <div className="selected-container-right">
                        <div className="selected-container-right-el">

                            <span className="selected-container-right-el-lbl">Description</span>
                            <div className="selected-product-desc">{description}</div>

                        </div>


                    </div>


                </div>
                



            </div>
        }
    </>
  )
}

export default SelectedProduct