import { useContext, useEffect, useState, FC, useRef } from "react";
import { getChannelDetails, getChannels } from "../../../utils/dataFetching";
import "../../../styles/dashboard/browseChannels.css";
import { Auth } from "../../../App";
import { PulseLoader } from "react-spinners";

interface BrowseChannelsProps {
  selectedChannel: any[];
  setSelectedChannel: React.Dispatch<React.SetStateAction<any[]>>;
}

const BrowseChannels: FC<BrowseChannelsProps> = (props) => {
  const { selectedChannel, setSelectedChannel } = props;
  const userData = useContext(Auth);
  const [channels, setChannels] = useState([]);
  const [total, setTotal] = useState<number>(0);
  const [ids, setIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentButton = useRef(null);
  const [isClicked, setIsClicked] = useState();

  useEffect(() => {
    displayChannel();
  }, [setChannels, selectedChannel]);

  const joinHandler = (e: any, id: number, name: string) => {
    e.preventDefault();

    setSelectedChannel((prevChannel: any) => [
      ...prevChannel,
      { name: name, id: id },
    ]);

    currentButton.current = e.target;
    setIsClicked(e.target.id);
    currentButton.current.style.opacity = "0";
  };

  

  const displayChannel = async () => {
    try {
      const fetch = await getChannels(userData);
      const getData = fetch.data;

      setIsLoading(false);
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
    if (channels) {
      return channels.map((channel, index) => {
        // const testing = async () => {
        //   const test = await getChannelDetails(userData, channel.id);

        // };

        // testing();

        // setIds(channel.id);

        return (
          <div key={channel.id} className="channel">
            <div>
              <div className="channel-name">
                <i className="fa-solid fa-hashtag"></i>
                {channel.name}
              </div>
              <div className="channel-members">
                1 members • Channel ID: {channel.id} • Created:{" "}
                {channel.created_at.substring(0, 10)}
              </div>
            </div>
            <button
              id={channel.id}
              className="channel-join"
              onClick={(e: any) => joinHandler(e, channel.id, channel.name)}
            >
              Join
            </button>
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
        {isLoading ? (
          <PulseLoader size={15} className="load" color="#461e46" />
        ) : (
          <Display />
        )}
      </div>
    </div>
  );
};

export default BrowseChannels;
