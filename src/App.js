import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import About from "./pages/about/About";
import Navbar from "./components/navbar/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from "./pages/admin/AdminDashboard/AdminDashboard";
import AdminProductEdit from "./pages/admin/AdminProductEdit/AdminProductEdit";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import Orders from "./pages/orders/Orders";
import AdminOrders from "./pages/admin/AdminOrders/AdminOrders";
import Search from "./pages/search/Search";
import Profile from "./pages/profile/Profile";
import ForgotPassword from "./pages/forgot_password/ForgotPassword";
import AdminRoute from "./protected/AdminRoute";
import UserRoute from "./protected/UserRoute";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product/details/:id" element={<ProductDetails />} />





          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* about */}
          <Route path="/about" element={<About />} />

          {/* Admin routes */}
          <Route element={<AdminRoute />} >
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/product/edit/:id" element={<AdminProductEdit />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
          </Route>

          {/* user Route */}
          <Route element={<UserRoute />} >
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          {/* search */}
          <Route path="/search/:query" element={<Search />} />

          {/* profile */}

          <Route path="/forgot_password" element={<ForgotPassword />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
