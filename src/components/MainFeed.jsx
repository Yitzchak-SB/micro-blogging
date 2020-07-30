import React from "react";
import InputPost from "./InputPost";
import PostFeed from "./PostFeed";
import UserContext from "./data/UserContext";
import { Row, Col } from "react-bootstrap";
import { getTweets, postTweet } from "../lib/api";

class MainFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, error: null, interval: null };
  }

  async getTweets() {
    const tweets = await getTweets();
    await this.props.setTweets(tweets.data);
    this.setState({ loading: false });
  }

  async handleOnClick(event, input) {
    event.preventDefault();
    this.setState({ error: null, loading: true });
    const date = new Date(Date.now()).toISOString();
    const userName = this.context.name;
    const newTweet = { content: input, userName: userName, date: date };
    try {
      const newTweetData = await postTweet(newTweet);
      newTweetData.data.id = Math.random();
      const newTweetsData = this.context.tweets;
      newTweetsData.tweets[-1] = newTweetData.data;
      this.props.setTweets(newTweetsData);
    } catch (err) {
      this.setState({ error: err.message });
    }
    this.setState({ loading: false });
  }

  componentDidMount() {
    this.getTweets();
    const interval = setInterval(() => {
      this.getTweets();
    }, 10000);
    this.setState({ interval: interval });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    return (
      <>
        <Row>
          <Col sm={{ span: 6, offset: 3 }}>
            <ul>
              <li key="0">
                <InputPost
                  loading={this.state.loading}
                  handleOnClick={(event, input) =>
                    this.handleOnClick(event, input)
                  }
                />
              </li>
              <li key="1">
                {this.state.loading && (
                  <div className="spinner-grow text-light" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
                {this.state.error && (
                  <p className="text-white">{this.state.error}</p>
                )}
                <PostFeed />
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
