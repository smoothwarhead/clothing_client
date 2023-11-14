import { useParams } from "react-router-dom";
import SessionManager from "../../utils/SessionManager";
import { DataContext } from "../../context/DataContext";
import useApi from "../../hooks/useApi";
import { useContext, useEffect, useState } from 'react';
import Button from "../../components/buttons/Button";
import { productInputs } from "../../utils/inputs";
import './addProducts.css';
// import ProductInput from '../../components/ProductInput';
import { BsFillCloudArrowUpFill } from 'react-icons/bs';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import ProductTextArea from "../../components/forms/productInput/ProductTextArea";
import Modal from "../../components/modals/Modal";
import ConfirmationPage from "../../components/modals/ConfirmationPage";
import ImageResizer from "../../utils/ImageResizer";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { Api} from "../../api/axios";
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
// import {scale} from "@cloudinary/url-gen/actions/resize";
import ProductInput from "../../components/forms/productInput/ProductInput";
import PlusIcon from "../../components/plusIcon/PlusIcon";
import { hasEmptyKey } from "../../utils/methods";




// const initialValues = {
//     productName: "",
//     description: "",
//     quantity: "",
//     unitPrice: "",
//     slug: "",
//     dimensions: [],
//     data: ""
        // color: "",
        // size: "",
        // pack: "",
        // slug: "",
// }



const EditProducts = () => {


  const { id } = useParams();

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [slug, setSlug] = useState("");
  const [productImage, setProductImage] = useState("");
  const [editSlug, setEditSlug] = useState(false);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [pack, setPack] = useState("");
  const [prevImage, setPrevImage] = useState("");




  const { modalOpen, setModalOpen, message } = useContext(DataContext);
  const { setLoggedIn } = useContext(AuthContext);    

  const { editProduct } = useApi();



  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [file, setFile] = useState({
    file:[],
  });

  const [showImage, setShowImage] = useState(false);
  const [showUploadBtn, setShowUploadBtn] = useState(true);
  const [showActions, setShowActions] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [isEdit, setIsEdit] = useState(false);


  

  const navigate = useNavigate();


//   const handleChange = (e) => {

//     setValues({ ...values, [e.target.name]: e.target.value});   

//   }


  


  const handleProductName = (e) => {

    setProductName(e.target.value);
    setEditSlug(true);

  }

  const handleQuantity = (e) => {
    setQuantity(e.target.value);

  }

  const handlePrice = (e) => {
    setUnitPrice(e.target.value);

  }

  const handleColor = (e) => {
    setColor(e.target.value);

  }

  const handleSize = (e) => {
    setSize(e.target.value);

  }

  const handlePack = (e) => {
    setPack(e.target.value);

  }



  const handleDescription = (e) => {
    setDescription(e.target.value);

  }

  const handleSlugChange = (e) => {
    setSlug(e.target.value);
   

  }


  // image preview
  const imageHandler = (e) => {
    const selected = e.target.files[0];
    setFile({...file, file: selected});
    ImageResizer.editImageResizer(selected, setProductImage);

    // imageResizer(selected, formData, setFormData);


    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if(selected && ALLOWED_TYPES.includes(selected.type)){
        let reader = new FileReader();
        reader.onloadend = () => {
            setProfilePicture(reader.result);

        }
        reader.readAsDataURL(selected)
    } else {
        // setError(true);
        console.log("file not supported");
    }


  }

 


  const handleImageChange = () => {
    setIsChange(true);
    setShowImage(true);
    setShowActions(false);

  } 

  const handleOk = () => {
    setModalOpen(false);
    navigate("/admin/products");
    // setProductReload(true);
    
  }


  const handleCloseModal = () => {
    setModalOpen(false);
  }




useEffect(() => {


      
    const getProduct = async () => 
    {

        const token = SessionManager.getToken();
        // const user = SessionManager.getUser();

        setPending(true);
        setIsEdit(true);

        try {

            let res = await Api.get(`/admin/products/product/${id}`, {

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true

            });

            console.log(res);

            if(res.status === 200){

                setPending(false);
                setProductName(res.data.ProductName);
                setDescription(res.data.ProductDescription);
                setSlug(res.data.ProductSlug);
                setUnitPrice(parseFloat(res.data.Variations[0].UnitPrice).toFixed(2).toString());
                setQuantity(res.data.Variations[0].Quantity);
                setProductImage(res.data.Variations[0].ImageUrl);
                setPrevImage(res.data.Variations[0].ImageUrl);
                setColor(res.data.Variations[0].Color);
                setSize(res.data.Variations[0].Size);
                setPack(res.data.Variations[0].NumberInPack);

                    
            }
            
        } catch (error) {
            console.log(error);
            setPending(false);        

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

        

    }

    getProduct();


}, [id, message, setLoggedIn]);



useEffect(() => {
    if((profilePicture && !isChange) || (isEdit && !isChange)){
      setShowImage(true);
      setShowUploadBtn(false);
    }else{
      setShowUploadBtn(true);
    }


}, [profilePicture, setShowImage, setShowUploadBtn, isChange, isEdit]);



const handleImageRemove = () => {
    setShowActions(false);

    if(isEdit){
        setProductImage("");
        return
    }else{
        setProfilePicture(null)
    }

} 



  
// Create and configure your Cloudinary instance.
const cld = new Cloudinary({
    cloud: {
        cloudName: 'greenietec'
    }
}); 

// Use the image with public ID, 'bike'.
const myImage = cld.image(productImage);

// Scale the image to a width of 400 pixels.
// myImage.resize(scale().width(250).height(245));




const handleIconClick = () => {
    console.log("click icon")
}


const saveProduct = () => {

    const fileData = { productName, description, quantity, unitPrice, prevImage, color, size, pack,  productImage, slug: productName?.split(" ").join("-").toLowerCase() };
    

    if(hasEmptyKey(fileData))
    {
      setError(true);
    }
    else{

    //   console.log(fileData);


      setPending(true);

      editProduct(fileData, id);
    

    }

}



  return (

    <>
        { modalOpen &&
            <Modal                     
                modalBody={ <ConfirmationPage handleOk={handleOk} /> }
                modalType={message.type}
                closeModal={handleCloseModal}
                
            />
        }
        <div className="dash-page">

            <div className="dash-top">
                <div className="add-product-title">Edit Product</div>

                <div className="dash-page-btns">

                    <Button 
                        hasIcon={false} 
                        btnText={pending ? "Saving":  "Save Product" }
                        action={saveProduct}
                        isActive={true}
                        Icon={null}

                    />

                </div>

            </div>

            <div className="add-product-container">


                <div className="add-product-el-container">


                    <div className="add-product-el add-product-el-1">

                        {/* image upload */}

                        <div className="image-upload-container">

                            <div className="product-input-lbl">{'Product Image (required)'}</div>

                            { showImage &&
                                <div className="img-section">

                                    <div 
                                    className="img-actions"
                                    onClick={() => setShowActions(!showActions)}
                                    
                                    >
                                        <BiDotsHorizontalRounded className='image-action-icon'/>
                                    </div>

                                    {showActions &&
                                    <div className="actions">
                                    <div 
                                        className="acts change-action"
                                        onClick={handleImageChange}
                                    >
                                        Change
                                    </div>

                                    <div 
                                        className="acts remove-action"
                                        onClick={handleImageRemove}

                                    >
                                        Remove
                                    </div>

                                    </div>
                                    }

                                    <div className="image-upload">

                                        {   
                                            (isEdit && !isChange) ? 

                                            <AdvancedImage style={{maxWidth: '100%', maxHeight: '100%'}} cldImg={myImage} />
                                            :

                                            <img src={profilePicture} alt="" className="img" />

                                        
                                        }
                                    </div>

                                </div>
                            }
                            


                            { showUploadBtn &&
                                <div className="camera-container">
                                        <input type="file" id="input" name="profileImage" accept="image/*" onChange={imageHandler}/>
                                        <div className="upload-icon-con">
                                            <label htmlFor="input" className="image-upload-lbl">
                                                <BsFillCloudArrowUpFill className='upload-icon' />
                                            </label>
                                            
                                        </div>
                                </div>
                            }

                        </div>
                        { error && !profilePicture ? <span className="product-inp-error-msg">Product Image is required</span> : <div></div> }


                        
                    </div>




                    <div className="add-product-el add-product-el-2">

                        <div className="add-product-el-2-left">



                            <ProductInput

                                inputType="text"
                                label="Product name (required)"   
                                value={productName} 
                                handleChange={handleProductName}  
                                errorMessage = "Product name is required."
                                name= "productName"
                                error = {error}
                                cName = "product-input"

                            />


                            <ProductInput

                                inputType="text"
                                label="Quantity (required)"   
                                value={quantity} 
                                handleChange={handleQuantity}  
                                errorMessage = "Quantity is required."
                                name= "quantity"
                                error = {error}
                                cName = "product-input"

                            />


                            <ProductInput

                                inputType="text"
                                label="Price (required)"   
                                value={unitPrice} 
                                handleChange={handlePrice}  
                                errorMessage = "Price is required."
                                name= "price"
                                error = {error}
                                cName = "product-input"

                            />


                            <div className="variations">

                                <div className="variations-header">
                                    <span className='variations-header-title'>
                                    {"Variations (e.g. Color, Size, Pack)"}
                                    </span>

                                    <div className='variations-header-icon'>
                                        <PlusIcon 
                                        hoverText = "Click to add more variations"
                                        action = {handleIconClick}
                                        />
                                    </div>

                            
                                </div>


                                <div className="variations-el">

                                    <ProductInput
                                    
                                        inputType="text"
                                        label="Color (required)"   
                                        value={color} 
                                        handleChange={handleColor}  
                                        errorMessage = "Product color is required."
                                        name= "color"
                                        hint = "If the product has a pack, input all the colors (e.g. Blue, Red)"
                                        error = {error}
                                        cName = "product-input"

                                    />

                                    <ProductInput
                                    
                                        inputType="text"
                                        label="Size (required)"   
                                        value={size} 
                                        handleChange={handleSize}  
                                        errorMessage = "Product size is required."
                                        name= "size"
                                        hint = "S = Small, M = Medium, L = Large, XL - Extra-Large"
                                        error = {error}
                                        cName = "product-input"

                                    />

                                    <ProductInput
                                    
                                        inputType="text"
                                        label="Number of product in a Pack (required)"   
                                        value={pack} 
                                        handleChange={handlePack}  
                                        errorMessage = "Number of product in a pack is required."
                                        name= "pack"
                                        hint = "0, 1, 2, 3, 4"
                                        error = {error}
                                        cName = "product-input"

                                    />



                                </div>

                                <span className="spacer"></span>


                            </div>


                             {/* <span className="spacer"></span> */}


                        </div>


                        <div className="add-product-el-2-right">

                            

                            <ProductTextArea 

                                value={description} 
                                handleChange={handleDescription}
                                error={error}

                            />


                            <ProductInput

                                inputType="text"
                                label="Product Slug (required)"   
                                value={editSlug ? productName?.split(" ").join("-").toLowerCase() : slug} 
                                handleChange={handleSlugChange}  
                                errorMessage = "Product Slug is required."
                                name= "slug"
                                hint = "This is set after the product name is entered."
                                error = {error}
                                cName = "product-input"

                            />




                        </div>

                

                    </div>
                    
                    




                </div>


            </div>



        </div>

    </>
    
      
  )
}

export default EditProducts;