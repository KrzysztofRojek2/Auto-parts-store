import './App.css'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './containers/navbar/Navbar'
import Header from './containers/header/Header'
import CategoriesWrapper from './containers/categoriesWrapper/CategoriesWrapper'
import BlogsWrapper from './containers/blogsWrapper/BlogsWrapper'
import Footer from './containers/footer/Footer'
import Home from './sites/Home/Home';
import About from './sites/About/About';
import Login from './sites/Login/Login';
import Register from './sites/Register/Register';
import Shop from './sites/Shop/Shop';
import ProductPage from './sites/ProductPage/ProductPage';
import UserPanel from './sites/UserPanel/UserPanel';
import Cart from './sites/Cart/Cart';
import Shipping from './sites/Shipping/Shipping';
import AdminHome from './Admin/AdminHome/AdminHome';
import AdminTransactions from './Admin/AdminTransactions/AdminTransactions';
import AdminProducts from './Admin/AdminProducts/AdminProducts';
import AdminCars from './Admin/AdminCars/AdminCars';
import AdminBrands from './Admin/AdminBrands/AdminBrands';
import AdminTransactionsOngoing from './Admin/AdminTransactionsOngoing/AdminTransactionsOngoing';
import AdminTransactionsMenu from './Admin/AdminTransactionsMenu/AdminTransactionsMenu';
import Rodo from './sites/RODO/Rodo';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './components/checkoutForm/CheckoutForm';
const stripePromise = loadStripe('pk_test_51PRL0b04C4ttgsDqrOKLVeyM9ah6Xbg6QZ59miitXihuluNOn4XpCJqoHpfxpTr2WP1Igy3cvcNmE0wCcQZ56tzF00wrhmTAEa');

function App() {
  return (
     <Router>
       {/* <Navbar /> */}
       <Routes>
         <Route path="/rodo" element={<Rodo />} />
         <Route path="/admin-brands" element={<AdminBrands />} />
         <Route path="/admin-cars" element={<AdminCars />} />
         <Route path="/admin-products" element={<AdminProducts />} />
         <Route path="/admin-transactions" element={<AdminTransactions />} />
         <Route path="/admin-transactions/awaiting" element={<AdminTransactions />} />
         <Route path="/admin-transactions/approved" element={<AdminTransactions />} />
         <Route path="/admin-transactions-menu" element={<AdminTransactionsMenu />} />
         <Route path="/admin-transactions-ongoing" element={<AdminTransactionsOngoing />} />
         <Route path="/admin-home" element={<AdminHome />} />
         <Route path="/user-panel" element={<UserPanel />} />
         <Route path="/cart" element={<Cart />} />
         <Route path="/shipping" element={<Shipping />} />
         <Route path="/" element={<Home />} />
         <Route path="/" component={<Home/>} />
         <Route path="/about" element={<About />} />
         <Route path="/about" component={<About/>} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="/shop" element={<Shop />} />
         <Route path="/shop/:categoryId" element={<Shop />} />
         <Route path="/shop/category/:categoryId" element={<Shop />} />
         <Route path="/product" element={<ProductPage />} />
         <Route path="/product/:id" element={<ProductPage />} />
         <Route path="/payment" element={<Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>} />
       </Routes>
       {/* <Footer /> */}
     </Router>
  );
 }
 
 export default App;