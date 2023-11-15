import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import './dashboardLayout.css';
import SideBar from '../../components/sidebar/SideBar';
import TopBar from '../../components/topbar/TopBar';
import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import Modal from '../../components/modals/Modal';
import ConfirmationPage from '../../components/modals/ConfirmationPage';




const DashboardLayout = () => {

  // const navigate = useNavigate();

  const { completed, setModalOpen, setDeleteMode, closeModal, message } = useContext(DataContext);

  const confirm = () => {

    setModalOpen(false);
    setDeleteMode(false);
    return <Navigate to="admin/products" replace={true}/>

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