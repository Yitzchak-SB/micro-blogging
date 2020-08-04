import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const LikeButton = (props) => {
  const [liked, setLiked] = useState(false);
  const handleOnClick = () => {
    props.handleLike();
    if (liked) return setLiked(false);
    return setLiked(true);
  };
  return (
    <FontAwesomeIcon
      className={`${liked ? "like" : "un-like"}`}
      style={{ cursor: "pointer" }}
      icon={liked ? faThumbsDown : faThumbsUp}
      onClick={handleOnClick}
    ></FontAwesomeIcon>
  );
};

export default LikeButton;
