import logo from "./logo.svg";
import "./App.css";
import React, { useContext } from 'react';
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainpage/MainPage";
import MovementsLib from "./pages/movementslib/movementslib";
import GestureTag from "./pages/gesturetag/gesturetag";
import GestureManagement from "./pages/gesturemanagement/gesturemanagement";
import { LanguageSwitcher } from "./pages/language-management/LanguageSwicher";
import { LanguageContext } from "./pages/language-management/LanguageContext";
function App() {

  const { language } = useContext(LanguageContext);
  document.documentElement.setAttribute('dir', language === 'he' ? 'rtl' : 'ltr');

  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/MovementLib" element={<MovementsLib />} />
        <Route path="/GestureTag" element={<GestureTag />} />
        <Route path="/GestureManagement" element={<GestureManagement />} />
      </Routes>
      <div>
        <LanguageSwitcher />
      </div>
    </div>
  );
}

export default App;
