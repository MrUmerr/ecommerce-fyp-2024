// import React from 'react';
// import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
// import Home from './components/HomeComponents/Home';
// import Mens from './men/Mens';
// import Girls from './girl/Girls';
// import Kids from './kid/kids';
// import Contacts from './contact/contacts';
// import Brandings from './brand/Brandings';
// import Marketings from './Market/Marketings';
// import Advertisements from './Advertise/Advertisements';
// import Aboutus from './About/Aboutus';
// import Presskit from './Preskit/Presskit';
// import Offices from './Ofice/Offices';
// import Termsofuses from './Terms/Termsofuses';
// import Pricacypolices from './Pop/Pricacypolices';
// import Cookiepolices from './CookiePolicy/Cookiepolices';
// import Signup from './components/Signup';
// import CardPage from './components/CardPage';
// import OrderPage from './components/OrderPage';
// import Login from './components/Login';
// import { Toaster } from "react-hot-toast";
// import { useAuth } from './context/AuthProvider';
// import Shopcards from './components/Shopcards';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';


// const FilteredData = () => {
//   const location = useLocation();
//   const filteredData = location.state?.filteredData || [];

//   return (
//     <>
//     <Navbar />
//     <div className="max-w-screen-2xl container mx-auto md:px-16 px-2">
//       <div className="mt-28">
//         <h1 className="text-3xl items-center justify-center font-bold">Filtered Data</h1>
//       </div>
//       <div className="mt-4 pt-2 grid grid-cols-2 md:grid-cols-5 gap-4">
//         {filteredData.map((item) => (
//           <Shopcards key={item._id} item={item} />
//         ))}
//       </div>
//     </div>
//     <Footer />
//     </>
//   );
// };

// const App = () => {
//   const [authUser] = useAuth();

//   return (
//     <>
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/Men' element={authUser ? <Mens /> : <Navigate to="/Signup" />} />
//         <Route path='/Girl' element={authUser ? <Girls /> : <Navigate to="/Signup" />} />
//         <Route path='/Kids' element={authUser ? <Kids /> : <Navigate to="/Signup" />} />
//         <Route path='/Contact' element={<Contacts />} />
//         <Route path='/Branding' element={<Brandings />} />
//         <Route path='/Marketing' element={<Marketings />} />
//         <Route path='/Advertisement' element={<Advertisements />} />
//         <Route path='/Aboutus' element={<Aboutus />} />
//         <Route path='/Presskit' element={<Presskit />} />
//         <Route path='/Office' element={<Offices />} />
//         <Route path='/Termofuse' element={<Termsofuses />} />
//         <Route path='/PrivacyPolicy' element={<Pricacypolices />} />
//         <Route path='/CookiePolicy' element={<Cookiepolices />} />
//         <Route path='/Signup' element={<Signup />} />
//         <Route path='/OrderPage' element={authUser ? <OrderPage /> : <Navigate to="/Signup" />} />
//         <Route path='/Login' element={<Login />} />
//         <Route path='/FilteredData' element={<FilteredData />} />
//         <Route path='/product/:pid' element={<CardPage />} />
        
//         {/* Placeholder components */}
//         <Route path='/Pk Mart' element={<div />} />
//         <Route path='/Addtocart' element={<div />} />
//         <Route path='/Cartdetails' element={<div />} />
//       </Routes>
//       <Toaster />
//     </>
//   );
// };

// export default App;


import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/HomeComponents/Home';
import Mens from './men/Mens';
import Girls from './girl/Girls';
import Kids from './kid/kids';
import Contacts from './contact/contacts';
import Brandings from './brand/Brandings';
import Marketings from './Market/Marketings';
import Advertisements from './Advertise/Advertisements';
import Aboutus from './About/Aboutus';
import Presskit from './Preskit/Presskit';
import Offices from './Ofice/Offices';
import Termsofuses from './Terms/Termsofuses';
import Pricacypolices from './Pop/Pricacypolices';
import Cookiepolices from './CookiePolicy/Cookiepolices';
import Signup from './components/Signup';
import CardPage from './components/CardPage';
import OrderPage from './components/OrderPage';
import Login from './components/Login';
import { Toaster } from "react-hot-toast";
import { useAuth } from './context/AuthProvider';
import Shopcards from './components/Shopcards';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductsAdminPanel from './components/productadmin/productsadminpanel';
// import ProductAdminPanel from './components/ProductAdminPanel';



const FilteredData = () => {
  const location = useLocation();
  const filteredData = location.state?.filteredData || [];

  return (
    <>
    <Navbar />
    <div className="max-w-screen-2xl container mx-auto md:px-16 px-2">
      <div className="mt-28">
        <h1 className="text-3xl items-center justify-center font-bold">Filtered Data</h1>
      </div>
      <div className="mt-4 pt-2 grid grid-cols-2 md:grid-cols-5 gap-4">
        {filteredData.map((item) => (
          <Shopcards key={item._id} item={item} />
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

const App = () => {
  const [authUser] = useAuth();

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Men' element={authUser ? <Mens /> : <Navigate to="/Signup" />} />
        <Route path='/Girl' element={authUser ? <Girls /> : <Navigate to="/Signup" />} />
        <Route path='/Kids' element={authUser ? <Kids /> : <Navigate to="/Signup" />} />
        <Route path='/Contact' element={<Contacts />} />
        <Route path='/Branding' element={<Brandings />} />
        <Route path='/Marketing' element={<Marketings />} />
        <Route path='/Advertisement' element={<Advertisements />} />
        <Route path='/Aboutus' element={<Aboutus />} />
        <Route path='/Presskit' element={<Presskit />} />
        <Route path='/Office' element={<Offices />} />
        <Route path='/Termofuse' element={<Termsofuses />} />
        <Route path='/PrivacyPolicy' element={<Pricacypolices />} />
        <Route path='/CookiePolicy' element={<Cookiepolices />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/OrderPage' element={authUser ? <OrderPage /> : <Navigate to="/Signup" />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/FilteredData' element={<FilteredData />} />
        <Route path='/product/:pid' element={<CardPage />} />
        {/* <Route path='/productadminpanel' element={<ProductAdminPanel />} /> */}
        <Route path='/ProductAdmin' element={<ProductsAdminPanel />} />

        {/* Placeholder components */}
        <Route path='/Pk Mart' element={<div />} />
        <Route path='/Addtocart' element={<div />} />
        <Route path='/Cartdetails' element={<div />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;

