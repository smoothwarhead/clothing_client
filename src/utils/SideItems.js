import { AiFillHome } from 'react-icons/ai'
import { FaStore, FaShoppingCart, FaUsers } from 'react-icons/fa'
import { BsCreditCardFill } from 'react-icons/bs'

export const sideNav = [

    {
        name: "Dashboard",
        icon : <AiFillHome />,
        to: "/admin"
    }, 
    {
        name: "Products",
        icon : <FaStore />,
        to: "/admin/products"
    }, 
    {
        name: "Orders",
        icon : <FaShoppingCart />,
        to: "/admin/orders"
    }, 
    {
        name: "Transactions",
        icon : <BsCreditCardFill />,
        to: "/admin/transactions"
    }, 
    {
        name: "Staffs",
        icon : <FaUsers />,
        to: "/admin/staffs"
    }, 


]