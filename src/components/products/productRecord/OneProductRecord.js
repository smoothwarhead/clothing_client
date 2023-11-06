import './oneProductRecord.css';
import StringFormat from '../../../utils/StringFormat';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import {scale} from "@cloudinary/url-gen/actions/resize";
import { useContext, useState } from 'react';
import ActionIcon from '../../../assets/svgs/ActionIcon';
import { DataContext } from '../../../context/DataContext';
import ActionDropDown from '../../actions/ActionDropDown';
import { useNavigate } from 'react-router-dom';



const OneProductRecord = ({ product }) => {


    const [showActions, setShowActions] = useState(false);
    const [hovered, setHovered] = useState(false);

    // const { setOpenDetails, setSelectedProduct } = useContext(DataContext);

    const navigate = useNavigate();

    // Create and configure your Cloudinary instance.
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'greenietec'
        }
    }); 

    // Use the image with public ID.
    const myImage = cld.image(product?.Variations[0].ImageUrl);

    // Scale the image to a width of 400 pixels.
    myImage.resize(scale().width(40).height(30));


    const handleActionBtn = () => {
        setShowActions(!showActions)
    }

    const handleMouseLeave = () => {
        setShowActions(false)
        setHovered(false)
    }

    const handleSelect = () => {
        navigate(`/admin/products/product/${product.ProductId}`);

        // setOpenDetails(true);
        // setSelectedProduct(product);
    }


  return (

    <>
        
        <div className="product-content-con"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
        
        >
            <div className="clicker" onClick={handleSelect}></div>

            <div className="product-content-elements">

                <div className="product-elements product-title-id">{StringFormat.truncateWord(product?.ProductId.toString(), 5)}</div>
                <div className="product-elements product-title-image">
                    <div className="prdt-img">
                        <AdvancedImage style={{maxWidth: '100%', maxHeight: '100%'}} cldImg={myImage}/>                    
                    </div>

                </div>

                <div className="product-elements product-title-name">{StringFormat.truncateWord(product?.ProductName)}</div>
                <div className="product-elements product-title-desc">{StringFormat.truncateWord(product?.ProductDescription, 50)}</div>
                <div className="product-elements product-title-qty">{product?.Variations[0].Quantity}</div>
                <div className="product-elements product-title-price">{`$ ${parseFloat(product?.Variations[0].UnitPrice).toFixed(2).toString()}`}</div>
                <div className="product-elements product-title-action">
                    <div className="prdt-icon-con" onClick={handleActionBtn}>
                        <ActionIcon className="prdt-icon" />
                    </div>
                    {(showActions && hovered) && <ActionDropDown product={product}/>}

                </div>

            </div>

        </div>
        
    
    </>
    
  )
}

export default OneProductRecord;