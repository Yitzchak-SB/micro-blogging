import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SignOutButton from "./SignOutButton";

function UserNav() {
  const location = useLocation();
  let [path, setPath] = useState(location.pathname);
  if (path !== location.pathname) {
    setPath(location.pathname);
  }
  return (
    <div className="w-100 d-flex justify-content-between align-items-center">
      {path === "/" && (
        <div>
          <Link className="text-white p-3" to="/">
            Home
          </Link>
          <Link className="text-muted p-3" to="profile">
            Profile
          </Link>
        </div>
      )}
      {path === "/profile" && (
        <div>
          <Link className="text-muted p-3" to="/">
            Home
          </Link>
          <Link className="text-white p-3" to="profile">
            Profile
          </Link>
        </div>
      )}
      <SignOutButton className="mr-3 float-right" />
    </div>
  );
}

export default UserNav;
