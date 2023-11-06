import { Outlet } from 'react-router-dom';
import './dashboardLayout.css';
import SideBar from '../../components/sidebar/SideBar';
import TopBar from '../../components/topbar/TopBar';






const DashboardLayout = () => {
  return (
    <div className='admin-page'>

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