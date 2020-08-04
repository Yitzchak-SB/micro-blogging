import React from "react";
import { FirebaseContext } from "./Firebase";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function SignOutButtonBase(props) {
  const onSignOut = (event) => {
    props.firebase.doSignOut(event);
    props.history.push("/");
  };
  return (
    <Button type="button" onClick={onSignOut}>
      <FontAwesomeIcon icon={faSignOutAlt} />
    </Button>
  );
}

const SignOut = withRouter(SignOutButtonBase);

const SignOutButton = () => {
  return (
    <div>
      <FirebaseContext.Consumer>
        {(firebase) => <SignOut firebase={firebase} />}
      </FirebaseContext.Consumer>
    </div>
  );
};

export default SignOutButton;
