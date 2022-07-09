import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./pages/sidebar";
import Message from "./pages/message";
import "../../styles/app.css";

interface DashboardProps{
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dashboard: React.FC<DashboardProps> = ({setIsLoggedIn}) => {
  return (
    <>
      <Sidebar setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="messages" element={<Message />} />
      </Routes>
    </>
  );
};

export default Dashboard;
