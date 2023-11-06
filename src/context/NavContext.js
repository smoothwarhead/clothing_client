import { createContext, useRef, useState } from 'react';


export const NavContext = createContext({});

export const NavProvider = ({ children }) => {

    

    const [isDark, setIsDark] = useState(true);
    const [slideAccount, setSlideAccount] = useState(false);
    const [slideCart, setSlideCart] = useState(false);
    const [slideSearch, setSlideSearch] = useState(false);
    const [slideForgot, setSlideForgot] = useState(false);
    const [slideMenu, setSlideMenu] = useState(false);
    const [slideAdminMenu, setSlideAdminMenu] = useState(false);
    const [slideAdminSearch, setSlideAdminSearch] = useState(false);
    const [slideProfile, setSlideProfile] = useState(false);

    const searchInputRef = useRef();


    
    


    return (
        <NavContext.Provider value={{ 
            slideAccount, 
            setSlideAccount,
            slideCart, 
            setSlideCart,
            slideSearch, 
            setSlideSearch,
            slideForgot, 
            setSlideForgot,
            slideMenu, 
            setSlideMenu,
            searchInputRef,
            isDark, 
            setIsDark,
            slideAdminMenu, 
            setSlideAdminMenu,
            slideAdminSearch, 
            setSlideAdminSearch,
            slideProfile, 
            setSlideProfile

          }}
        >
            {children}
        </NavContext.Provider>
    )

}

export default NavContext;