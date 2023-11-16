import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './dashboardLayout.css';
import SideBar from '../../components/sidebar/SideBar';
import TopBar from '../../components/topbar/TopBar';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import Modal from '../../components/modals/Modal';
import ConfirmationPage from '../../components/modals/ConfirmationPage';




const DashboardLayout = () => {

  const [pageReload, setPageReload] = useState(false);

  const navigate = useNavigate();
    
  const location = useLocation();


  useEffect(() => {
    if(!pageReload){
      return
    }else{
      window.location.reload(false);
    }
  }, [pageReload])



  const { completed, setModalOpen, setCompleted, setDeleteMode, closeModal, message } = useContext(DataContext);

  const confirm = () => {

    setModalOpen(false);
    setCompleted(false);
    setDeleteMode(false);

    if(location.pathname === "/admin/products"){
      setPageReload(true);
    }else{
      navigate(-1);

    }
   

  }

  return (
    <div className='admin-page'>

        {completed &&
          <Modal                     
            modalBody={ <ConfirmationPage handleOk={confirm}/> }
            modalType={message.type}
            closeModal={closeModal}
            
          />
        }

        <div className="top-section">
            <TopBar />
        </div>


        <div className="admin-body-section">
            <Outlet />
        </div>

        <div className="side-section">
          <SideBar />            
        </div>
    </div>
  )
}

export default DashboardLayout