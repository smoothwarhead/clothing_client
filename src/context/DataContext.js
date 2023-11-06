import { createContext, useState } from "react"

export const DataContext = createContext({});



const DataProvider = ({ children }) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);

    const [pending, setPending] = useState(false);
    const [productReload, setProductReload] = useState(false);
    const [appAdmin, setAppAdmin] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);


    const [message, setMessage] = useState({
        body: "",
        type: ""
    });

    const closeModal = () => {
        setModalOpen(false);
    }

   

  return (
    <DataContext.Provider value={{ 
        message, 
        setMessage, 
        modalOpen, 
        setModalOpen, 
        closeModal, 
        pending, 
        setPending, 
        appAdmin, 
        setAppAdmin,
        productReload, 
        setProductReload,
        openDetails, setOpenDetails,
        deleteMode, setDeleteMode,
        selectedProduct, setSelectedProduct

    }}
    >
        {children}
    </DataContext.Provider>
  )
}

export default DataProvider;