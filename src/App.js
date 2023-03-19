import logo from "./logo.svg";
import "./App.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainpage/MainPage";
import MovementsLib from "./pages/movementslib/movementslib";
import GestureTag from "./pages/gesturetag/gesturetag";
import GestureManagement from "./pages/gesturemanagement/gesturemanagement";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/MovementLib" element={<MovementsLib />} />
      <Route path="/GestureTag" element={<GestureTag />} />
      <Route path="/GestureManagement" element={<GestureManagement />} />
    </Routes>
  );
}

export default App;
