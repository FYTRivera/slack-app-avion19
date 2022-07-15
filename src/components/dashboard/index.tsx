import { FC, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./pages/sidebar";
import DirectMessages from "./pages/directMessage";
import Introduction from "./pages/introduction";
import "../../styles/dashboard/index.css";
import BrowseChannels from "./pages/browseChannels";
import CreateChannelModal from "./modal/createChannelModal";
import DirectMessageModal from "./modal/startDirectMessage";

const Dashboard: FC = () => {
  const [onModal, setOnModal] = useState(false);
  const [startMessage, setStartMessage] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState([]);

  return (
    <div className="dashboard">
      {startMessage && (
        <DirectMessageModal
          setStartMessage={setStartMessage}
          setSelectedUser={setSelectedUser}
        />
      )}
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
        selectedUser={selectedUser}
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
        <Route path="direct_messages" element={<DirectMessages />} />
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
