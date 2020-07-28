import React from "react";
import InputPost from "./InputPost";
import { PostFeed } from "./PostFeed";
import Tweet from "./data/Tweet";
import userContext from "./data/userContext";
import { Row, Col } from "react-bootstrap";

class MainFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tweets: [] };
  }

  handleOnClick(event, input) {
    event.preventDefault();
    const userName = this.context.name;
    const newTweet = new Tweet(input, userName);
    console.log(newTweet);
    this.setState((state) => {
      return { tweets: [...state.tweets, newTweet] };
    });
  }

  render() {
    console.log(this.state.tweets);
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

MainFeed.contextType = userContext;
export default MainFeed;
