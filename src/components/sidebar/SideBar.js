import React from 'react'
import './sidebar.css';
import { sideNav } from '../../utils/SideItems';
import { NavLink } from 'react-router-dom';






const SideBar = () => {

    // const { pathname } = useLocation();

  return (
    <>
        <div className="side-bar">
            <div className="side-bar-link">
                {
                    sideNav.map((item) => (
                        <NavLink
                            to={item.to}
                            key={item.name}                           
                            
                            // className={({ isActive }) => {
                            //     console.log(item.to + ' ' + isActive)
                            // }}

                            end
                            
                        >
                            <div className="nav-icon">{item.icon}</div>
                           
                            <p className='nav-items'>                            
                                {item.name}
                            </p>

                        </NavLink>
                    ))
                    
                }

            </div>
        </div>
    
    
    </>
  )
}

export default SideBar