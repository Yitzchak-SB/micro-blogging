import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import MainFeed from "./components/MainFeed";
import UserContext from "./components/data/UserContext";
import TopNav from "./components/TopNav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserProfile from "./components/UserProfile";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "Omer", tweets: null };
  }

  setName(name) {
    this.setState({ name: name });
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
          value={{ name: this.state.name, tweets: this.state.tweets }}
        >
          <Router>
            <Row>
              <Col sm={{ offset: 2, span: 8 }}>
                <TopNav />
              </Col>
            </Row>
            <Switch>
              <Route exact path="/">
                <MainFeed
                  setTweets={(tweets) => {
                    this.setTweets(tweets);
                  }}
                />
              </Route>
            </Switch>
            <Switch>
              <Route path="/profile">
                <Row>
                  <Col sm={{ span: 6, offset: 3 }}>
                    <UserProfile
                      setName={(name) => {
                        this.setName(name);
                      }}
                    />
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

export default App;
