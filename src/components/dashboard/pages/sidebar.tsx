import React from "react";
import { Link } from "react-router-dom";

interface SidebarProps{
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({setIsLoggedIn}) => {

  return( 
  <>
  <div className="sidebar">SIDEBAR</div>
  {/* <div><Link to="/messages" onClick={()=>console.log("messages")}>Messages</Link></div> */}
  <div><Link to="/signin" onClick={()=>setIsLoggedIn(false)}>Log Out</Link></div>
  </>
  );
};

export default Sidebar;
