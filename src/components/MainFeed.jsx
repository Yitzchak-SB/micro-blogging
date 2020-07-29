import React from "react";
import InputPost from "./InputPost";
import { PostFeed } from "./PostFeed";
import Tweet from "./data/Tweet";
import UserContext from "./data/UserContext";
import { Row, Col } from "react-bootstrap";
import { getTweets, postTweet } from "../lib/getTweets";

class MainFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tweets: [] };
  }

  handleOnClick(event, input) {
    event.preventDefault();
    const userName = this.context.name;
    const newTweet = new Tweet(input, userName);
    this.setState((state) => {
      return { tweets: [...state.tweets, newTweet] };
    });
  }

  render() {
    return (
      <>
        <Row>
          <Col sm={{ span: 6, offset: 3 }}>
            <ul>
              <li key="0">
                <InputPost
                  handleOnClick={(event, input) =>
                    this.handleOnClick(event, input)
                  }
                />
              </li>
              <li key="1">
                <PostFeed data={this.state.tweets} />
              </li>
            </ul>
          </Col>
        </Row>
      </>
    );
  }
}

MainFeed.contextType = UserContext;
export default MainFeed;
