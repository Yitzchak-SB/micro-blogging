import React from "react";
import UserNav from "./UserNav";
import NonUserNav from "./NonUserNav";

function TopNav(props) {
  return (
    <div
      style={{ backgroundColor: "#343A40", height: 58 }}
      className="text-white d-flex "
    >
      {!props.authUser && <NonUserNav />}
      {props.authUser && <UserNav />}
    </div>
  );
}

export default TopNav;
