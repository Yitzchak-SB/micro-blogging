import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function NonUserNav() {
  const location = useLocation();
  let [path, setPath] = useState(location.pathname);
  if (path !== location.pathname) {
    setPath(location.pathname);
  }
  return (
    <>
      {path === "/" && (
        <>
          <Link className="text-muted p-3" to="/login">
            Login
          </Link>
          <Link className="text-muted p-3" to="/sign-up">
            SignUp
          </Link>
        </>
      )}
      {path === "/login" && (
        <>
          <Link className="text-white p-3" to="/login">
            Login
          </Link>
          <Link className="text-muted p-3" to="/sign-up">
            SignUp
          </Link>
        </>
      )}
      {path === "/sign-up" && (
        <>
          <Link className="text-muted p-3" to="/login">
            Login
          </Link>
          <Link className="text-white p-3" to="/sign-up">
            SignUp
          </Link>
        </>
      )}
    </>
  );
}

export default NonUserNav;
