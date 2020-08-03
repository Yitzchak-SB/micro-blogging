import React from "react";
import { Button } from "react-bootstrap";

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
          My Tweets
        </Button>
      )}
      {!props.checked && (
        <Button
          className="all-tweets btn-success"
          onClick={() => {
            props.setChecked();
          }}
        >
          All Tweets
        </Button>
      )}
    </>
  );
};

export default TweetButton;
