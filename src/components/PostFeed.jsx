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

  render() {
    if (this.context.tweets && this.props.users) {
      const tweets = this.buildPostFeed(this.context.tweets);
      return <ul>{tweets}</ul>;
    }
    return <></>;
  }
}

export default PostFeed;
PostFeed.contextType = UserContext;
