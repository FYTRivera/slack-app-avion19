import { useRef, useState, FC, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Auth } from "../../../App";
import "../../../styles/dashboard/sidebar.css";

interface SidebarProps {
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedChannel: any[];
  setSelectedChannel: React.Dispatch<React.SetStateAction<any[]>>;
}

const Sidebar: FC<SidebarProps> = ({
  setOnModal,
  selectedChannel,
  setSelectedChannel,
}) => {
  const channelList = useRef(null);
  const [chHeight, setChHeight] = useState("");
  const userData = useContext(Auth);

  const onLogOut = () => {
    localStorage.clear();
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
    window.location.reload();
  };

  const channelHandler = () => {
    if (channelList.current.clientHeight === 0) {
      setChHeight("auto");
      channelList.current.style.height = chHeight;
    } else {
      setChHeight("0px");
      channelList.current.style.height = chHeight;
    }
  };

  const openModal = () => {
    setOnModal(true);
  };

  useEffect(() => {
    setInterval(() => {
      // console.log(selectedChannel);
    }, 200);
  }, []);

  const AddChannel = () => {
    const newChannell = JSON.parse(localStorage.getItem("newChannels"));

    if (newChannell) {
      return newChannell.map((channel: any) => {
        const to = `channel/:${channel.id}`;

        return (
          <NavLink to={to} className="browse-channels" key={channel.id}>
            <i className="fa-solid fa-hashtag"></i>
            {channel.name}
          </NavLink>
        );
      });
    }
  };

  return (
    <div className="sidebar">
      <Link to="/dashboard" className="title">
        Avion School<i className="fa-solid fa-angle-down"></i>
        <span className="pen-square">
          <i className="fa-solid fa-pen-to-square"></i>
        </span>
      </Link>
      <div className="options">
        <Link to="threads" className="threads">
          <i className="fa-regular fa-comment-dots"></i>Threads
        </Link>
        <Link to="direct_messages" className="direct-message">
          <i className="fa-regular fa-comments"></i>Direct messages
        </Link>
        <Link to="mentions_and_reactions" className="mentions">
          <i className="fa-solid fa-at"></i>Mentions & reactions
        </Link>
        <div className="more">
          <i className="fa-solid fa-ellipsis-vertical"></i>More
        </div>
      </div>
      <div className="channels">
        <label
          htmlFor="channels"
          className="label-channel"
          onClick={channelHandler}
        >
          <input type="checkbox" name="channels" id="channels" />
          <i className="fa-solid fa-caret-down"></i>
          <span className="channel">Channels</span>
          <span className="add-channel" onClick={openModal}>
            <i className="fa-solid fa-plus"></i>
          </span>
        </label>

        <div className="channel-list" ref={channelList}>
          <NavLink to="channels" className="browse-channels">
            <i className="fa-solid fa-square-plus"></i>Browse channels
          </NavLink>
          <AddChannel />
        </div>
      </div>
      <div className="direct-message"></div>

      <div className="footer-logout">
        <div className="user-email">{userData.uid}</div>
        <Link to="/signin" onClick={onLogOut} className="logout">
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
