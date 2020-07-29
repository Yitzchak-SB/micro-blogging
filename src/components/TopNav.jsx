import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function TopNav(props) {
  const location = useLocation();
  let [path, setPath] = useState(location.pathname);
  if (path !== location.pathname) {
    setPath(location.pathname);
  }
  return (
    <div
      style={{ backgroundColor: "#343A40", height: 58 }}
      className="text-white d-flex "
    >
      {path === "/" && (
        <>
          <Link className="text-white p-3" to="/">
            Home
          </Link>
          <Link className="text-muted p-3" to="profile">
            Profile
          </Link>
        </>
      )}
      {path === "/profile" && (
        <>
          <Link className="text-muted p-3" to="/">
            Home
          </Link>
          <Link className="text-white p-3" to="profile">
            Profile
          </Link>
        </>
      )}
    </div>
  );
}

export default TopNav;
