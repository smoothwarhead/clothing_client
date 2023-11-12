import { useContext, useEffect, useState } from 'react';
import { productInputs } from '../../utils/inputs';
import Button from '../../components/buttons/Button';
import './addProducts.css';
import ProductInput from '../../components/forms/productInput/ProductInput';
import { BsFillCloudArrowUpFill } from 'react-icons/bs';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { DataContext } from '../../context/DataContext';
import Modal from '../../components/modals/Modal';
import ProductTextArea from '../../components/forms/productInput/ProductTextArea';
import ConfirmationPage from '../../components/modals/ConfirmationPage';
import useApi from '../../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import ImageResizer from '../../utils/ImageResizer';
import { hasEmptyKey } from '../../utils/methods';
import PlusIcon from '../../components/plusIcon/PlusIcon';






const initialValues = {
  productName: "",
  description: "",
  quantity: "",
  unitPrice: "",
  color: "",
  size: "",
  pack: "",
  slug: "",
  data: ""
}


const AddProducts = () => {



  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [file, setFile] = useState({
    file:[],
  });

  const [showImage, setShowImage] = useState(false);
  const [showUploadBtn, setShowUploadBtn] = useState(true);
  const [showActions, setShowActions] = useState(false);
  const [isChange, setIsChange] = useState(false);
  // const [modalOpen, setModalOpen] = useState(false);

  

  const { modalOpen, setModalOpen, pending, setPending, message} = useContext(DataContext);

  const { createProduct } = useApi();



  const navigate = useNavigate();


  const handleChange = (e) => {

    setValues({ ...values, [e.target.name]: e.target.value});   

  }


  const handleDescription = (e) => {
    setValues({ ...values, description: e.target.value});

  }

  const handleSlugChange = (e) => {
    setValues({ ...values, slug: e.target.value});

  }


  // image preview

  const imageHandler = (e) => {
    const selected = e.target.files[0];
    setFile({...file, file: selected});
    ImageResizer.imageResizer(selected, values, setValues)

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


  useEffect(() => {
    if(profilePicture && !isChange){
      setShowImage(true);
      setShowUploadBtn(false);
    }else{
      setShowUploadBtn(true);
    }


  }, [profilePicture, setShowImage, setShowUploadBtn, isChange])



  // const addItem = (newItem) => {
       
  //   setValues({...values, dimensions: [newItem, ...values.dimensions]});

  // };

  // const removeDimension = (id) => {
  //     // const removeItem = dimensions.filter(item => item.id !== id);
  //     const removeDimension = values.dimensions.filter(item => item.id !== id);
  //     // setItems(removeItem);
  //     setValues({...values, dimensions: removeDimension});

      
  // };



  const addProduct = () => {

    const fileData = {...values, productImage: file.file, slug: values.productName?.split(" ").join("-").toLowerCase() };
    console.log(fileData);


    if(hasEmptyKey(fileData))
    {
      setError(true);
    }
    else{

      setPending(true);

      console.log(fileData);
      // createProduct(fileData);



    }

  }


  const handleImageChange = () => {
    setIsChange(true);
    setShowImage(true);
    setShowActions(false);

  } 

  const handleImageRemove = () => {
    setShowActions(false);
    setProfilePicture(null);

  } 
 

  const handleOk = () => {
    setModalOpen(false);
    navigate("/admin/products");
    // setProductReload(true);
    
  }


  const handleCloseModal = () => {
    setModalOpen(false);
  }


  const handleIconClick = () => {
    console.log("click icon")
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
          <div className="add-product-title">Add Product</div>

          <div className="dash-page-btns">

              <Button 
                hasIcon={false} 
                btnText={pending ? "Adding":  "Add Product" }
                action={addProduct}
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
                        <img src={profilePicture} alt="" className="img" />
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
                  {
                    productInputs.map((input, index) => (

                      <ProductInput

                        key={index}
                        inputType={!input.isNum ? "text" : "Number"}
                        {...input}   
                        value={values[input.name]} 
                        handleChange={handleChange}  
                        errorMessage = {input.errorMessage}
                        error = {error}
                        cName = "product-input"

                      />

                    ))

                  }


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
                        value={values.color} 
                        handleChange={handleChange}  
                        errorMessage = "Product color is required."
                        name= "color"
                        hint = "If the product has a pack, input all the colors (e.g. Blue, Red)"
                        error = {error}
                        cName = "product-input"

                      />

                      <ProductInput
                    
                        inputType="text"
                        label="Size (required)"   
                        value={values.size} 
                        handleChange={handleChange}  
                        errorMessage = "Product size is required."
                        name= "size"
                        hint = "S = Small, M = Medium, L = Large, XL - Extra-Large"
                        error = {error}
                        cName = "product-input"

                      />

                      <ProductInput
                    
                        inputType="text"
                        label="Number of product in a Pack (required)"   
                        value={values.pack} 
                        handleChange={handleChange}  
                        errorMessage = "Number of product in a pack is required."
                        name= "pack"
                        hint = "0, 1, 2, 3, 4"
                        error = {error}
                        cName = "product-input"

                      />



                    </div>

                    <span className="spacer"></span>


                  </div>

                  
                  


              </div>



              <div className="add-product-el-2-right">

                <ProductTextArea 
                  value={values.description} 
                  handleChange={handleDescription}
                  error={error}

                />

                <ProductInput
                  
                  inputType="text"
                  label="Product Slug (required)"   
                  value={values.productName?.split(" ").join("-").toLowerCase()} 
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

export default AddProducts;