import { useContext, useEffect, useState, FC } from "react";
import { getChannelDetails, getChannels } from "../../../dataFetching";
import "../../../styles/dashboard/browseChannels.css";
import { Auth } from "../../../App";
// import Display from "../displayChannels";

const BrowseChannels: FC = () => {
  const userData = useContext(Auth);
  const [channels, setChannels] = useState([]);
  const [members, setMembers] = useState("");
  const [total, setTotal] = useState(0);
  const [id, setId] = useState([]);

  useEffect(() => {
    displayChannel();
  }, []);

  const displayChannel = async () => {
    try {
      const fetch = await getChannels(userData);
      const getData = fetch.data;

      setChannels(getData);
      setTotal(getData.length);
    } catch (e) {
      console.error(e);
    }
  };

  // const channelDetails = async (user: any) => {
  //   try {
  //     return await getChannelDetails(userData, user.id).then((result) => {
  //       return result.data;
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const Display = (): any => {
    const [test, setTest] = useState();
    if (channels) {
      return channels.map((user, index) => {
        const test = getChannelDetails(userData, user.id);
        // console.log(test);

        return (
          <div key={index} className="channel">
            <div className="channel-name">
              <i className="fa-solid fa-unlock-keyhole"></i>
              {user.name}
            </div>
            <div className="channel-members">2 members</div>
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
          {total} {total === 1 ? "channel" : "channels"}
        </div>
      </div>
      <div className="display-channels">
        <Display />
      </div>
    </div>
  );
};

export default BrowseChannels;
