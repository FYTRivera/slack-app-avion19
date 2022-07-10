import { useEffect, useState } from "react";
import { getChannels } from "../../../dataFetching";
import "../../../styles/dashboard/browseChannels.css";

const BrowseChannels: React.FC = () => {
  const [total, setTotal] = useState(1);

  useEffect(() => {
    const displayChannel = async () => {
      try {
        const fetch = await getChannels();

        console.log(fetch);
      } catch (e) {
        console.log(e);
      }
    };

    displayChannel();
  });

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
        <div className="counter-channels">{total} channels</div>
      </div>
    </div>
  );
};

export default BrowseChannels;
