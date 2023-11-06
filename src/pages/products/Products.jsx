import { useNavigate } from 'react-router-dom';
import './products.css';
import '../../pages/dashboard/dashboard.css';
import ProductTable from '../../components/products/productTable/ProductTable';
import ProductGrid from '../../components/products/productGrid/ProductGrid';
import { useContext, useState } from 'react';
// import PlusIcon from '../../../files/svgs/PlusIcon';
import { RxCaretDown, RxCaretUp } from 'react-icons/rx';
import MobileProductTable from '../../components/products/productTable/MobileProductTable';
import useFetch from '../../hooks/useFetch';
import ProductDetails from '../../components/modals/ProductDetails';
import Button from '../../components/buttons/Button';
import { BiPlus } from 'react-icons/bi';
import useMediaQuery from '../../hooks/useMediaQuery';
import { DataContext } from '../../context/DataContext';
import Modal from '../../components/modals/Modal';
import ConfirmationPage from '../../components/modals/ConfirmationPage';
import Loader from '../../components/loader/Loader'






const Products = () => {

  const{ data: products } = useFetch(`/admin/products`);

  const { openDetails, setOpenDetails, deleteMode, setDeleteMode, message, pending } = useContext(DataContext);


  
  const [isGridView, setIsGridView] = useState(false);
  const [isListView, setIsListView] = useState(true);

  const [view, setView] = useState(false);

  const navigate = useNavigate();
  
  const isMax720 = useMediaQuery('(max-width: 720px)');
  const isMin0 = useMediaQuery('(min-width: 0px)');



  const showListView = () => {
   
    setIsListView(true);
    setIsGridView(false);

  }

  const showGridView = () => {
   
    setIsGridView(true);
    setIsListView(false);

  }

  const addProduct = () => {
    navigate("/admin/products/add-product", {replace: false});
  };



  const handleProductDelete = () => {
    setDeleteMode(false);
    navigate("/admin/products");    
  }

  const handleDeleteModal = () => {
    setDeleteMode(false);
  }

  const handleDetailsModal = () => {
    setOpenDetails(false);
  }


  return (
    <>
      {pending && <Loader/> }
      {!pending &&
        <>
          { 
            deleteMode && 
            <Modal                     
              modalBody={ <ConfirmationPage handleOk={handleProductDelete} doubleBtn={true} /> }
              modalType={message.type}
              closeModal={handleDeleteModal}
                
            />
          }

          { 
            openDetails && 
            <Modal                     
              modalBody={ <ProductDetails handleOk={handleDetailsModal} doubleBtn={false} /> }
              modalType="success"
              closeModal={handleDetailsModal}
                
            />
          }



          <div className="dash-page">
            
            <div className="dash-top">
              
              <div className="dash-title">Products</div>

              


              <div className="dash-page-btns">

                  <div 
                    className="view-btn"
                    onClick={() => setView(!view)}

                  >
                  { view &&
                      <div className="view-dropdown">

                          <div className="view-actions" onClick={showGridView}>Grid</div>
                          <div className="view-actions" onClick={showListView}>List</div>

                        </div>
                    
                    }


                    <p>View</p>
                    <div >

                      {!view ?
                        <RxCaretDown className="view-icon" />
                        :
                        <RxCaretUp className="view-icon" />
                      }

                    </div>

                  </div>



                  <Button 
                    hasIcon={true} 
                    btnText="Add Product" 
                    action={addProduct}
                    isActive={true}
                    Icon={BiPlus}
                    
                  />

              </div>



            </div>


            <div className="product-page-container">


              {
                products.length === 0 ? <span className="no-data">No product in stock</span>

                :
                <div className="product-view-grid">

                  <div className={isListView ? "product-list-view-container" : "no-view"}>
                    
                    {(isMax720 && isMin0) ?
                      
                      products.map((product, index) => (
                        <MobileProductTable product={product} key={index} />

                      ))
                      :
                      <ProductTable products={products} />
                    }

                  </div>

                  <div className={isGridView ? "product-grid-view-container" : "no-view"}>
                    
                    <ProductGrid products={products} />
                  </div>


                </div>
              
              }

            
            </div>

            


          </div>

        </>
      }
    </>
  )
}

export default Products;