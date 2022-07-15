import React, { FC, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./pages/sidebar";
import Threads from "./pages/threads";
import DirectMessages from "./pages/directMessage";
import MentionsAndReactions from "./pages/mentions_and_reactions";
import Introduction from "./pages/introduction";
import "../../styles/dashboard/index.css";
import BrowseChannels from "./pages/browseChannels";
import CreateChannelModal from "./modal/createChannelModal";
import DirectMessageModal from "./modal/startDirectMessage";

interface dashboardProp {
  signInData: {
    id?: number;
  };
}

const Dashboard: FC<dashboardProp> = (props) => {
  const { signInData } = props;
  const [onModal, setOnModal] = useState(false);
  const [startMessage, setStartMessage] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<any[]>([]);

  return (
    <div className="dashboard">
      {startMessage && <DirectMessageModal setStartMessage={setStartMessage} />}
      {onModal && (
        <CreateChannelModal
          setOnModal={setOnModal}
          selectedChannel={selectedChannel}
          setSelectedChannel={setSelectedChannel}
        />
      )}
      <Sidebar
        setOnModal={setOnModal}
        selectedChannel={selectedChannel}
        setSelectedChannel={setSelectedChannel}
        setStartMessage={setStartMessage}
      />
      <Routes>
        <Route
          path=""
          element={
            <Introduction
              setOnModal={setOnModal}
              setStartMessage={setStartMessage}
            />
          }
        />
        <Route
          path="channels"
          element={
            <BrowseChannels
              selectedChannel={selectedChannel}
              setSelectedChannel={setSelectedChannel}
            />
          }
        />
        <Route
          path="threads"
          element={
            <Introduction
              setOnModal={setOnModal}
              setStartMessage={setStartMessage}
            />
          }
        />
        <Route
          path="direct_messages"
          element={<DirectMessages signInData={signInData} />}
        />
        <Route
          path="mentions_and_reactions"
          element={
            <Introduction
              setOnModal={setOnModal}
              setStartMessage={setStartMessage}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Dashboard;
