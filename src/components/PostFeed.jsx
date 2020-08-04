import React from "react";
import { Card } from "react-bootstrap";
import UserContext from "./data/UserContext";

class PostFeed extends React.Component {
  buildPostFeed(data) {
    let result = [];
    for (let key in data) {
      const tweet = (
        <li key={data[key].id}>
          <Card
            style={{
              padding: 15,
              marginTop: 15,
              backgroundColor: "#343A40",
              border: "none",
              minHeight: 100,
            }}
          >
            <div className="d-flex justify-content-between">
              <span className="text-muted float-left">
                {this.props.users[data[key].userId].username}
              </span>
              <span className="text-muted float-right">{data[key].date}</span>
            </div>
            <p className="text-white pt-5">{data[key].content}</p>
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
