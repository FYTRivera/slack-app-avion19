import { useContext, useEffect, useState } from "react";
import { getChannelDetails, getChannels } from "../../../dataFetching";
import "../../../styles/dashboard/browseChannels.css";
import { Auth } from "../../../App";

const BrowseChannels: React.FC = () => {
  const userData = useContext(Auth);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const displayChannel = async () => {
      try {
        const fetch = await getChannels(userData);
        const getData = fetch.data;

        setChannels(getData);
      } catch (e) {
        console.log(e);
      }
    };

    displayChannel();
  }, []);

  const Display = (): any => {
    if (channels) {
      return channels.map((user) => {
        const getMembers = async () => {
          let members;
          for (let i = 0; i >= channels.length; i++) {
            const fetch = await getChannelDetails(userData, i);
            const data = fetch.data;
            members = data.channel_members.length;
            console.log(fetch);
          }
        };
        getMembers();
        return (
          <div key={user.id} className="channel">
            <div className="channel-name">
              <i className="fa-solid fa-unlock-keyhole"></i>
              {user.name}
            </div>
            <div className="channel-members">1 members</div>
          </div>
        );
      });
    } else {
      return <div className="no-channel">No channels</div>;
    }
  };

  return (
    <div className="all-channels">
      <div className="title">All Channels</div>
      <div className="input">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Search by channel name or description"
        />
      </div>
      <div className="channel-lists">
        <div className="counter-channels">
          {channels.length} {channels.length === 1 ? "channel" : "channels"}
        </div>
      </div>
      <div className="display-channels">
        <Display />
      </div>
    </div>
  );
};

export default BrowseChannels;
