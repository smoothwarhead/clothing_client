import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import {scale} from "@cloudinary/url-gen/actions/resize";
import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';







const ProductDetails = () => {

    const { selectedProduct } = useContext(DataContext);
    // Create and configure your Cloudinary instance.
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'greenietec'
        }
    }); 

    // Use the image with public ID, 'bike'.
    const myImage = cld.image(selectedProduct?.ImageUrl);

    // Scale the image to a width of 400 pixels.
    myImage.resize(scale().width(200).height(200));




  return (
    <div>
        
        <div className="modal-product-name">{selectedProduct?.ProductName}</div>
        <div className="modal-product-image">
            <AdvancedImage cldImg={myImage} />
        </div>
       
        <div className="modal-product-description">
            {selectedProduct?.ProductDescription}
        </div>

        <div className="modal-product-qty">
            <span className="qty-title">Quantity</span>
            <span className="qty">
                {selectedProduct?.Quantity}

            </span>
        </div>

        <div className="modal-product-price">
            <span className="price-title">Price</span>
            <span className="price">
                {`$${parseFloat(selectedProduct?.UnitPrice).toFixed(2).toString()}`}

            </span>
        </div>

        <div className="modal-dimension-title">Dimensions</div>
        <div className="modal-product-dimension">
            {selectedProduct?.Dimensions.map((dimension, index) => (
                <div className="modal-dimension" key={index}>{dimension.DimensionName}</div>

            ))}
            
        </div>

        <div className="modal-product-footer">
            <div className="modal-product-btns product-delete-btn">Delete</div>
            <div className="modal-product-btns product-edit-btn">Edit</div>


        </div>
            
    </div>
  )
}

export default ProductDetails;