import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import SearchBar from "./SearchBar";
import UserContext from "./data/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faIdCard } from "@fortawesome/free-solid-svg-icons";

function UserNav() {
  const location = useLocation();
  let [path, setPath] = useState(location.pathname);
  if (path !== location.pathname) {
    setPath(location.pathname);
  }
  const rightPath = path === "/";
  return (
    <div className="w-100 d-flex justify-content-between align-items-center">
      <div>
        <Link
          className={`p-3 ${rightPath ? "text-white" : "text-muted"}`}
          to="/"
        >
          <FontAwesomeIcon icon={faHome} />
        </Link>
        <Link
          className={`p-3 ${rightPath ? "text-muted" : "text-white"}`}
          to="profile"
        >
          <FontAwesomeIcon icon={faIdCard} />
        </Link>
      </div>
      <UserContext.Consumer>
        {(context) => <SearchBar context={context} />}
      </UserContext.Consumer>

      <SignOutButton className="mr-3 float-right" />
    </div>
  );
}

export default UserNav;
