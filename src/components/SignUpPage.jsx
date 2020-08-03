import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { FirebaseContext } from "./Firebase";
import { withRouter } from "react-router-dom";

const InitialState = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

class SignUpBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = InitialState;
  }

  handleOnSubmit(event) {
    event.preventDefault();
    const { email, passwordOne, username } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
        });
      })
      .then(() => {
        this.setState({ ...InitialState });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ error });
      });
    this.props.firebase.auth.onAuthStateChanged(function (user) {
      if (user) {
      }
    });
  }

  handleGoogleSignIn() {
    try {
      this.props.firebase.auth
        .signInWithPopup(this.props.firebase.googleProvider())
        .then((result) => {
          this.props.history.push("/");
        });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    const isInvalid =
      this.state.passwordOne !== this.state.passwordTwo ||
      this.state.passwordOne === "" ||
      this.state.email === "" ||
      this.state.username === "";
    return (
      <div>
        <Form
          onSubmit={(event) => {
            this.handleOnSubmit(event);
          }}
        >
          <Form.Group>
            <Form.Label className="text-white">UserName</Form.Label>
            <Form.Control
              style={{
                backgroundColor: "#15202B",
                border: "1px solid white",
                color: "white",
                width: "33%",
              }}
              type="text"
              value={this.state.username}
              onChange={(event) => {
                this.setState({ username: event.target.value });
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-white">Email</Form.Label>
            <Form.Control
              style={{
                backgroundColor: "#15202B",
                border: "1px solid white",
                color: "white",
                width: "33%",
              }}
              type="text"
              value={this.state.email}
              onChange={(event) => {
                this.setState({ email: event.target.value });
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-white">Password</Form.Label>
            <Form.Control
              style={{
                backgroundColor: "#15202B",
                border: "1px solid white",
                color: "white",
                width: "33%",
              }}
              type="text"
              value={this.state.passwordOne}
              onChange={(event) => {
                this.setState({ passwordOne: event.target.value });
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-white">
              Confirm Your Password
            </Form.Label>
            <Form.Control
              style={{
                backgroundColor: "#15202B",
                border: "1px solid white",
                color: "white",
                width: "33%",
              }}
              type="password"
              value={this.state.passwordTwo}
              onChange={(event) => {
                this.setState({ passwordTwo: event.target.value });
              }}
            />
          </Form.Group>
          <Button
            type="submit"
            onClick={(event) => {
              this.handleOnSubmit(event);
            }}
            disabled={isInvalid}
          >
            Sign Up
          </Button>
        </Form>
        <Button
          className="mt-5"
          type="submit"
          onClick={() => {
            this.handleGoogleSignIn();
          }}
        >
          Sign Up With Google
        </Button>
        {this.state.error && (
          <Alert className="mt-4" variant="light">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{this.state.error.message}</p>
          </Alert>
        )}
      </div>
    );
  }
}

const SignUp = withRouter(SignUpBase);

function SignUpPage() {
  return (
    <FirebaseContext.Consumer>
      {(firebase) => <SignUp firebase={firebase} />}
    </FirebaseContext.Consumer>
  );
}

export default SignUpPage;
