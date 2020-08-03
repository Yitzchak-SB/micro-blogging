import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MainFeed from "./components/MainFeed";
import TopNav from "./components/TopNav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import { FirebaseContext } from "./components/Firebase";
import UserContext from "./components/data/UserContext";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";

class AppBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, tweets: null };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(() => {
      const user = this.props.firebase.auth.currentUser;
      if (user) {
        const userData = {
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          emailVerified: user.emailVerified,
          userId: user.uid,
        };
        this.setState({ user: userData });
      } else this.setState({ user: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  setTweets(tweets) {
    this.setState({ tweets: tweets });
  }

  render() {
    return (
      <Container
        fluid={true}
        style={{ backgroundColor: "#15202B", minHeight: "100vh" }}
      >
        <UserContext.Provider
          value={{ user: this.state.user, tweets: this.state.tweets }}
        >
          <Router>
            <Row>
              <Col sm={{ offset: 2, span: 8 }}>
                <TopNav authUser={this.state.user} />
              </Col>
            </Row>
            {this.state.user && (
              <>
                <Switch>
                  <Route exact path="/">
                    <FirebaseContext.Consumer>
                      {(firebase) => (
                        <MainFeed
                          setTweets={(tweets) => {
                            this.setTweets(tweets);
                          }}
                          firebase={firebase}
                        />
                      )}
                    </FirebaseContext.Consumer>
                  </Route>
                </Switch>
                <Switch>
                  <Route path="/profile">
                    <Row>
                      <Col sm={{ span: 6, offset: 3 }}>
                        <FirebaseContext.Consumer>
                          {(firebase) => (
                            <UserProfile
                              setName={(name) => {
                                this.setName(name);
                              }}
                              firebase={firebase}
                            />
                          )}
                        </FirebaseContext.Consumer>
                      </Col>
                    </Row>
                  </Route>
                </Switch>
              </>
            )}
            <Switch>
              <Route path="/login">
                <Row>
                  <Col sm={{ span: 6, offset: 3 }}>
                    <LoginPage />
                  </Col>
                </Row>
              </Route>
            </Switch>
            <Switch>
              <Route path="/sign-up">
                <Row>
                  <Col sm={{ span: 6, offset: 3 }}>
                    <SignUpPage />
                  </Col>
                </Row>
              </Route>
            </Switch>
          </Router>
        </UserContext.Provider>
      </Container>
    );
  }
}

export function App() {
  return (
    <FirebaseContext.Consumer>
      {(firebase) => <AppBase firebase={firebase} />}
    </FirebaseContext.Consumer>
  );
}
