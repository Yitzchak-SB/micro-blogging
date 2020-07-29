import React from "react";
import InputPost from "./InputPost";
import { PostFeed } from "./PostFeed";
import UserContext from "./data/UserContext";
import { Row, Col } from "react-bootstrap";
import { getTweets, postTweet } from "../lib/api";

class MainFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tweets: [], loading: true, error: null };
  }

  async getTweets() {
    const tweets = await getTweets();
    this.setState({ tweets: tweets.data.tweets });
    await this.setState({ loading: false });
  }

  async handleOnClick(event, input) {
    event.preventDefault();
    this.setState({ error: null });
    await this.setState({ loading: true });
    const date = new Date(Date.now()).toISOString();
    const userName = this.context.name;
    const newTweet = { content: input, userName: userName, date: date };
    try {
      const newTweetData = await postTweet(newTweet);
      this.setState((state) => {
        return { tweets: [newTweetData.data, ...state.tweets] };
      });
    } catch (err) {
      this.setState({ error: err.message });
    }
    await this.setState({ loading: false });
  }

  componentDidMount() {
    this.getTweets();
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
                  <div className="spinner-grow" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
                {this.state.error && (
                  <p className="text-white">{this.state.error}</p>
                )}
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
