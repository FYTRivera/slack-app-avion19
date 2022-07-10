import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Sidebar from "./pages/sidebar";
import Threads from "./pages/threads";
import DirectMessages from "./pages/message";
import MentionsAndReactions from "./pages/mentions_and_reactions";
import AllChannels from "./pages/allChannels";
import "../../styles/dashboard/index.css";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <Routes>
        <Route path="threads" element={<Threads />} />
        <Route path="direct_messages" element={<DirectMessages />} />
        <Route path="mentions_and_reactions" element={<MentionsAndReactions />} />
        <Route path="allchannels" element={<AllChannels />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
