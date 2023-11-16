import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import './mobile-product-table.css';
import StringFormat from '../../../utils/StringFormat';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../../../context/DataContext';
import ConfirmationPage from '../../modals/ConfirmationPage';
import Modal from '../../modals/Modal';



const MobileProductTable = ({ product }) => {


    const navigate = useNavigate();

    const { message, modalOpen, setModalOpen, setEditMode, setMessage, setDeleteMode } = useContext(DataContext);


    // Create and configure your Cloudinary instance.
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'greenietec'
        }
    }); 

    // Use the image with public ID.
    const myImage = cld.image(product?.Variations[0].ImageUrl);

    // Scale the image to a width of 400 pixels.
    // myImage.resize(scale().width(40).height(30));


    const handleEdit = () => {
        setEditMode(true);
        navigate(`/admin/products/edit-product/${product.ProductId}`);

    }

    const handleDetails = () => {
        navigate(`/admin/products/product/${product.ProductId}`);

    }

    const handleDelete = () => {
        const msg = "Are you sure you want to delete this product?"
        setMessage({...message, body: msg, type: "error" });
        setDeleteMode(true);
       
    }


    const handleOk = () => {
        setModalOpen(false);
        navigate("/admin/products");
        // setProductReload(true);
        
      }
    
    
      const handleCloseModal = () => {
        setModalOpen(false);
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
        <div className='mobile-prdt-table-container'>

            <div className="mobile-prdt-table-flex-container">

                <div className="mobile-prdt-table-flex-container-left">
                    <div className="mobile-prdt-el mobile-prdt-el-image">
                        <div className="mobile-prdt-img">                
                            <AdvancedImage style={{maxWidth: '100%', maxHeight: '100%'}} cldImg={myImage}/>                    
                        
                        </div>
                    </div>

                </div>


                <div className="mobile-prdt-table-flex-container-right">

                    <div className="mobile-prdt-table-flex-container-right-el right-el-1">

                        <div className="mobile-prdt-el mobile-prdt-el-name">{product.ProductName}</div>
                        {/* <div className="mobile-prdt-el mobile-prdt-el-desc">{product.ProductDescription}</div> */}
                        <div className="mobile-prdt-el mobile-prdt-el-desc">{StringFormat.truncateWord(product?.ProductDescription, 100)}</div>


                    </div>

                    <div className="mobile-prdt-table-flex-container-right-el right-el-2">



                        <div className="right-el-2-els-1">

                            <div className="right-el-2-els-flex">
                                <div className="mobile-prdt-title mobile-prdt-name">Quantity:</div>
                                <div className="right-el-2-els-flex-els">{product.Variations[0].Quantity}</div>
                            </div>

                            <div className="right-el-2-els-flex">
                                <div className="mobile-prdt-title mobile-prdt-name">Price:</div>
                                <div className="right-el-2-els-flex-els">{`£${parseFloat(product?.Variations[0].UnitPrice).toFixed(2).toString()}`}</div>

                            </div>

                            <div className="right-el-2-els-flex">
                                <div className="mobile-prdt-title mobile-prdt-name">Color:</div>
                                <div className="right-el-2-els-flex-els">{product.Variations[0].Color}</div>
                            </div>



                        </div>



                        <div className="right-el-2-els-2">

                            <div className="right-el-2-els-flex">
                                <div className="mobile-prdt-title mobile-prdt-name">Number in Pack:</div>
                                <div className="right-el-2-els-flex-els">{product.Variations[0].NumberInPack}</div>
                            </div>

                            <div className="right-el-2-els-flex">
                                <div className="mobile-prdt-title mobile-prdt-name">Size:</div>
                                <div className="right-el-2-els-flex-els">{product.Variations[0].Size}</div>
                            </div>

                        </div>

                    

                    </div>

                    <div className="mobile-prdt-table-flex-container-right-el mobile-con-btn-flex">

                        <div 
                            className='mobile-con-btns mobile-prdt-btn-details'
                            onClick={handleDetails}

                        >
                            Details
                        </div>

                        <div 
                            className='mobile-con-btns mobile-prdt-btn-edit'
                            onClick={handleEdit}

                        >
                            Edit
                        </div>

                        <div 
                            className='mobile-con-btns mobile-prdt-btn-delete'
                            onClick={handleDelete}
                        >
                            Delete
                        </div>

                    </div>


                </div>

                

            </div>

            
        </div>
    </>
  )
}

export default MobileProductTable;