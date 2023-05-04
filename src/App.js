import logo from "./logo.svg";
import "./App.css";
import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainpage/MainPage";
import UserLogin from "./pages/userLogin/userLogin";
import MovementsLib from "./pages/movementsLib/movementslib";
import GestureTag from "./pages/gesturetag/gesturetag";
import GestureManagement from "./pages/gesturemanagement/gesturemanagement";
import GestureDisplay from "./pages/gesturedisplay/GestureDisplay";
import DemographicForm from "./pages/demographicForm/demographicForm";
import TagInstructions from "./pages/tagInstructions/tagInstructions";
import { LanguageSwitcher } from "./language-management/LanguageSwicher";
import { LanguageContext } from "./language-management/LanguageContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CreateNewGesture from "./pages/createNewGesture/createNewGesture";
import CreateNewExperiment from "./pages/createNewExperiment/createNewExperiment";

function App() {
  const { language } = useContext(LanguageContext);
  document.documentElement.setAttribute(
    "dir",
    language === "he" ? "rtl" : "ltr"
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <LanguageSwitcher />
      </div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/createNewExperiment" element={<CreateNewExperiment />} />
        <Route path="/CreateNewGesture" element={<CreateNewGesture />} />
        <Route path="/GestureTag" element={<GestureTag />} />
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path="/GestureManagement" element={<GestureManagement />} />
        <Route path="/MovementsLib" element={<MovementsLib />} />
        <Route path="/GestureDisplay" element={<GestureDisplay />} />
        <Route path="/DemographicForm" element={<DemographicForm />} />
        <Route path="/TagInstructions" element={<TagInstructions />} />
      </Routes>
    </DndProvider>
  );
}

export default App;
