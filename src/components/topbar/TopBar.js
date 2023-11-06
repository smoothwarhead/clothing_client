import { FaUserCircle } from 'react-icons/fa';
import { RxCaretDown, RxCaretUp } from 'react-icons/rx';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaSearch } from 'react-icons/fa';
import useMediaQuery from '../../hooks/useMediaQuery';
import NavContext from '../../context/NavContext';
import { useContext } from 'react';
import './topbar.css';
import AdminMenuSlide from '../slides/AdminMenuSlide';
import AdminSearchSlide from '../slides/AdminSearchSlide';
import AdminProfileSlide from '../slides/AdminProfileSlide';
import SessionManager from '../../utils/SessionManager';







const TopBar = () => {

    const isMax540 = useMediaQuery('(max-width: 540px)');
    const isMin0 = useMediaQuery('(min-width: 0px)');

    const { setSlideAdminSearch, setSlideAdminMenu, slideProfile, setSlideProfile } = useContext(NavContext);

    const userName = SessionManager.getUserName();



  return (
    <>
        <AdminMenuSlide />
        <AdminSearchSlide />
        <AdminProfileSlide />
        <div className="top-bar">            
        

            <div className="top-bar-con">

                <div className="mobile-section">
                    <GiHamburgerMenu className='menu-icon a-menu-icon' onClick={() => setSlideAdminMenu(true)}/>
                </div>

                <div className="top-1">
                    {
                        isMax540 && isMin0 ? 
                        <FaSearch 
                            className='a-search-icon'
                            onClick={() => setSlideAdminSearch(true)}
                        /> : 
                    
                        <input type="text" className='ad-search-input' name="search" placeholder="Type here to search" autoComplete='off'/>

                    }

                </div>

                <div className="top-2">
                    <div className="user-details">
                        <div className="user-image">
                            <FaUserCircle className='user-placeholder' />
                        </div>

                        <div className="user-name">
                            {userName}
                        </div>

                        <div className="caret-icon">
                            {!slideProfile ?
                                <RxCaretDown 
                                    onClick={() => setSlideProfile(true)}
                                    
                                />

                                :
                                <RxCaretUp
                                    onClick={() => setSlideProfile(false)}

                                />
                            }
                        </div>
                    </div>

                </div>

            </div>

        </div>
    </>
  )
}

export default TopBar