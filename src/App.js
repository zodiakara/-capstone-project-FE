import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AddProductForm from "./components/AddProductForm";
import CommunityPage from "./components/communityPage/CommunityPage";
import HomePage from "./components/landingPage/landingPage";
import LoginPage from "./components/LoginPage";
import ProductDetailPage from "./components/productsPage/ProductDetailPage";
import ProductsMainPage from "./components/productsPage/ProductsMainPage";
import RegisterPage from "./components/RegisterPage";
import UserMainPage from "./components/userPage/UserMainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<UserMainPage />} />
        <Route path="/product/add" element={<AddProductForm />} />
        <Route path="/products" element={<ProductsMainPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/community" element={<CommunityPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
