import React, { FC, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./pages/sidebar";
import Threads from "./pages/threads";
import DirectMessages from "./pages/message";
import MentionsAndReactions from "./pages/mentions_and_reactions";
import Introduction from "./pages/introduction";
import "../../styles/dashboard/index.css";
import BrowseChannels from "./pages/browseChannels";
import CreateChannelModal from "./modal/createChannelModal";

interface dashboardProp {
  token: string;
  client: string;
  expiry: string;
  uid: string;
  signInData: {
    id?: number;
  };
}

const Dashboard: FC<dashboardProp> = (props) => {
  const { token, client, expiry, uid, signInData } = props;
  const [onModal, setOnModal] = useState(false);

  return (
    <div className="dashboard">
      {onModal && <CreateChannelModal setOnModal={setOnModal} />}
      <Sidebar setOnModal={setOnModal} />
      <Routes>
        <Route path="" element={<Introduction />} />
        <Route path="channels" element={<BrowseChannels />} />
        <Route path="threads" element={<Threads />} />
        <Route
          path="direct_messages"
          element={
            <DirectMessages
              token={token}
              client={client}
              expiry={expiry}
              uid={uid}
              signInData={signInData}
            />
          }
        />
        <Route
          path="mentions_and_reactions"
          element={<MentionsAndReactions />}
        />
      </Routes>
    </div>
  );
};

export default Dashboard;
