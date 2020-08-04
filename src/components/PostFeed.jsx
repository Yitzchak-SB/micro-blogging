import React from "react";
import { Card } from "react-bootstrap";
import UserContext from "./data/UserContext";
import LikeButton from "./LikeButton";

class PostFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: [] };
  }

  sortByDate(data) {
    const newData = [];
    for (let key in data) {
      data[key].key = key;
      newData.push(data[key]);
    }
    const sortedData = newData.sort(
      (a, b) => new Date(Date.parse(b.date) - new Date(Date.parse(a.date)))
    );
    return sortedData;
  }

  buildPostFeed(data) {
    const tweets = this.sortByDate(data);
    let result = [];
    for (let unit in tweets) {
      const handleLike = () => {
        if (this.state.liked.includes(tweets[unit].key)) {
          const newLikes = this.state.liked.filter(
            (item) => item !== tweets[unit].key
          );
          return this.setState({ liked: newLikes });
        }
        this.setState((state) => {
          return { liked: [...state.liked, tweets[unit].key] };
        });
      };
      const liked = this.state.liked.includes(tweets[unit].key);
      const date = new Date(Date.parse(tweets[unit].date)).toDateString();
      const tweet = (
        <li key={tweets[unit].id}>
          <Card
            className={`${
              liked ? "tweet-card tweet-card-liked" : "tweet-card"
            }`}
          >
            <div className="d-flex justify-content-between ">
              <span className="text-muted float-left">
                {this.props.users[tweets[unit].userId].username}
              </span>
              <span className="text-muted float-right">{date}</span>
            </div>
            <p className="text-white pt-5">{tweets[unit].content}</p>
            <LikeButton handleLike={handleLike} />
          </Card>
        </li>
      );
      result.push(tweet);
    }
    return result;
  }

  searchData(data) {
    const { searchTerm, searchUsers } = this.context;
    const { users } = this.props;
    if (searchTerm === "") return this.buildPostFeed(data);
    if (searchUsers) {
      const usersKeys = [];
      for (let key in users) {
        if (users[key].username.includes(searchTerm)) usersKeys.push(key);
      }
      const tweets = {};
      for (let key in data) {
        if (usersKeys.includes(data[key].userId)) tweets[key] = data[key];
      }
      return this.buildPostFeed(tweets);
    }
    const tweets = {};
    for (let key in data) {
      if (data[key].content.includes(searchTerm)) tweets[key] = data[key];
    }
    return this.buildPostFeed(tweets);
  }

  sortData(data) {
    if (this.props.checked) {
      return this.searchData(data);
    } else {
      const currentUserId = this.context.user.userId;
      const userTweets = {};
      for (let key in data) {
        if (data[key].userId === currentUserId) userTweets[key] = data[key];
      }
      return this.searchData(userTweets);
    }
  }

  render() {
    if (this.context.tweets && this.props.users) {
      const tweets = this.sortData(this.context.tweets);
      return <ul>{tweets}</ul>;
    }
    return <></>;
  }
}

export default PostFeed;
PostFeed.contextType = UserContext;
