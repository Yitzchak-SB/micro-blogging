import React from "react";
import InputPost from "./InputPost";
import PostFeed from "./PostFeed";
import UserContext from "./data/UserContext";
import { FirebaseContext } from "./Firebase";
import { Row, Col } from "react-bootstrap";
import nextId from "react-id-generator";

class MainFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, error: null, interval: null, users: null };
  }

  writeTweet(tweet) {
    const tweetId = nextId(Date.now());
    this.props.firebase.tweet(tweetId).set(tweet);
  }

  getTweets() {
    let reference = this.props.firebase.tweets();
    reference.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.props.setTweets(data);
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
    this.setState({ loading: false });
  }

  async handleOnClick(event, input) {
    event.preventDefault();
    this.setState({ error: null, loading: true });
    const date = new Date(Date.now()).toISOString();
    console.log(this.context.tweets);
    const newTweet = {
      content: input,
      userId: this.context.user.userId,
      date: date,
      id: nextId(nextId(Date.now())),
    };
    try {
      this.writeTweet(newTweet);
    } catch (err) {
      console.log(err);
      this.setState({ error: err.message });
    }
    this.setState({ loading: false });
  }

  componentDidMount() {
    let reference = this.props.firebase.users();
    reference.on("value", async (snapshot) => {
      const users = await snapshot.val();
      this.setState({ users });
    });
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
                  <div className="spinner-grow text-light" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
                {this.state.error && (
                  <p className="text-white">{this.state.error}</p>
                )}
                <FirebaseContext.Consumer>
                  {(firebase) => (
                    <PostFeed users={this.state.users} firebase={firebase} />
                  )}
                </FirebaseContext.Consumer>
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
