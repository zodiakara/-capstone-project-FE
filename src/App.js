import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/landingPage/landingPage";
import LoginPage from "./components/LoginPage";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
