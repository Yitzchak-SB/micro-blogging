import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers } from "@fortawesome/free-solid-svg-icons";

const TweetButton = (props) => {
  return (
    <>
      {props.checked && (
        <Button
          className="my-tweets"
          onClick={() => {
            props.setChecked();
          }}
        >
          <FontAwesomeIcon icon={faUser} />
        </Button>
      )}
      {!props.checked && (
        <Button
          className="all-tweets btn-success"
          onClick={() => {
            props.setChecked();
          }}
        >
          <FontAwesomeIcon icon={faUsers} />
        </Button>
      )}
    </>
  );
};

export default TweetButton;
