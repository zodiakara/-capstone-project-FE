import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AddProductForm from "./components/AddProductForm";
import CommunityPage from "./components/communityPage/CommunityPage";

import InfoPage from "./components/InfoPage";
import HomePage from "./components/landingPage/landingPage";
import LoginPage from "./components/LoginPage";
import ProductDetailPage from "./components/productsPage/ProductDetailPage";
import ProductsMainPage from "./components/productsPage/ProductsMainPage";
import RegisterPage from "./components/RegisterPage";
import GenericUserPage from "./components/userPage/GenericUserPage";
import UserEditPage from "./components/userPage/UserEditPage";
import UserMainPage from "./components/userPage/UserMainPage";

import MessageList from "./components/messages/MessageList";
import { useSelector } from "react-redux";
import { PopperUnstyled } from "@mui/base";
import ChatWindow from "./components/messages/ChatWindow";

function App() {
  const messageList = useSelector((state) => state.messages.messageList);
  const messageBox = useSelector((state) => state.messages.messageBox);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<UserMainPage />} />
        <Route path="/user_edit" element={<UserEditPage />} />
        <Route path="/product/add" element={<AddProductForm />} />
        <Route path="/products" element={<ProductsMainPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/users/:userId" element={<GenericUserPage />} />
        <Route path="/info" element={<InfoPage />} />
      </Routes>
      {messageList && (
        <PopperUnstyled
          style={{
            position: "fixed",
            bottom: 0,
            right: "1.5rem",
            top: "unset",
            left: "unset",
            zIndex: 1,
          }}
          open={messageList}
        >
          <MessageList />
        </PopperUnstyled>
      )}
      {messageBox && (
        <PopperUnstyled
          style={{
            position: "fixed",
            bottom: 0,
            right: "20rem",
            top: "unset",
            left: "unset",
            zIndex: 1,
          }}
          open={messageBox}
        >
          <ChatWindow />
        </PopperUnstyled>
      )}
    </BrowserRouter>
  );
}

export default App;
