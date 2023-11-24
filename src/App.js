import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';
import SignIn from './pages/account/SignIn';
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import SessionManager from './utils/SessionManager';
import PersistLogin from './utils/PersistLogin';
import RequireAuth from './utils/RequireAuth';
import Profile from './pages/profile/Profile';
import Products from './pages/products/Products';
import AddProducts from './pages/addProducts/AddProducts';
import EditProducts from './pages/addProducts/EditProducts';
import SelectedProduct from './pages/selectedProduct/SelectedProduct';
import AccessDenied from './no-page/AccessDenied';








function App() {


  const { loggedIn, setLoggedIn, setUser } = useContext(AuthContext);


  useEffect(() => {

    const isAuth = SessionManager.getAuth();

    if(isAuth){

      const currentUser = SessionManager.getUser()

      setLoggedIn(isAuth);

      setUser(currentUser);

    }


  }, [setLoggedIn, loggedIn, setUser])





  return (
    <div className="App">
     <BrowserRouter>

        <Routes>              

          {/* Admin public routes */}

          <Route path="/denied" element={ <AccessDenied /> } />
          <Route path="/account" element={ <SignIn /> } /> 



          {/* admin private routes */}

          {/* <Route element={<PersistLogin />}>  */}

            <Route path="/" element={ <DashboardLayout /> }>

              
              <Route element={<RequireAuth allowedRoles={["SuperAdmin", "Staff"]} />}>

                <Route path="/" element={ <Navigate to="/admin" /> } /> 
                <Route path="/admin" element={ <Dashboard /> } /> 
                <Route path="/admin/profile/:id" element={<Profile /> } /> 
                <Route path="/admin/products" element={ <Products /> } /> 
                <Route path="/admin/products/add-product" element={ <AddProducts /> } /> 
                <Route path="/admin/products/edit-product/:id" element={ <EditProducts /> } /> 
                <Route path="/admin/products/product/:id" element={ <SelectedProduct /> } /> 


                

                {/* <Route index element={ <Dashboard /> } />  */}
                {/* <Route path="staffs" element={ <Staffs /> } />  */}
                {/* <Route path="products" element={ <AdminProducts /> } />  */}
                {/* <Route path="orders" element={ <Orders /> } />  */}
                {/* <Route path="transactions" element={ <Transactions /> } />  */}


              {/* </Route> */}

            </Route>

          </Route>


        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
