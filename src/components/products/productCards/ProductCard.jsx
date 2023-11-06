import ActionIcon from '../../../assets/svgs/ActionIcon';
import './productCard.css';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import {scale} from "@cloudinary/url-gen/actions/resize";
import ActionDropDown from '../../actions/ActionDropDown';
import { useContext, useState } from 'react';
import { DataContext } from '../../../context/DataContext';
import StringFormat from '../../../utils/StringFormat';









const ProductCard = ({ product }) => {

    const [showActions, setShowActions] = useState(false);
    const [hovered, setHovered] = useState(false);

    const { setOpenDetails, setSelectedProduct } = useContext(DataContext);


    
    // Create and configure your Cloudinary instance.
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'greenietec'
        }
    }); 

    // Use the image with public ID, 'bike'.
    const myImage = cld.image(product?.ImageUrl);

    // Scale the image to a width of 400 pixels.
    myImage.resize(scale().width(220).height(177));


    const handleActionBtn = () => {
        setShowActions(!showActions)
    }

    const handleMouseLeave = () => {
        setShowActions(false)
        setHovered(false)
    }

    const handleSelect = () => {
        setOpenDetails(true);
        setSelectedProduct(product);
    }



  return (
    <div className="admin-product-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleSelect}
    >
        <div className="admin-product-card-img-con">
            <div className="admin-product-card-img">
                <AdvancedImage cldImg={myImage} />
                
            </div>
        </div>
        <div className="admin-product-card-desc">{StringFormat.truncateWord(product.ProductDescription, 50)}</div>

        <div className="admin-product-card-footer">

            <div className="admin-product-card-price">{`$ ${parseFloat(product?.UnitPrice).toFixed(2).toString()}`}</div>
            <div className="admin-product-card-actions">
                <div className="admin-product-card-icon-con" onClick={handleActionBtn}>
                    <ActionIcon className="admin-product-card-icon" />
                </div>

                {(showActions && hovered) && <ActionDropDown product={product}/>}

            </div>

        </div>
    </div>
  )
}

export default ProductCard;