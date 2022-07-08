import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./pages/sidebar";
import Message from "./pages/message";

const Dashboard: React.FC = () => {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="messages" element={<Message />} />
      </Routes>
    </>
  );
};

export default Dashboard;
