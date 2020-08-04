import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { FirebaseContext } from "./Firebase";
import { withRouter } from "react-router-dom";

const InitialState = {
  email: "",
  password: "",
  error: null,
};

class LoginBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...InitialState };
  }

  onSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...InitialState });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ error });
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
    return (
      <div>
        <Form
          onSubmit={(event) => {
            this.onSubmit(event);
          }}
        >
          <Form.Group>
            <Form.Label className="text-white">Email</Form.Label>
            <Form.Control
              className="login-input"
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
              className="login-input"
              type="password"
              value={this.state.password}
              onChange={(event) => {
                this.setState({ password: event.target.value });
              }}
            />
          </Form.Group>
          <Button
            onClick={(event) => {
              this.onSubmit(event);
            }}
          >
            Login
          </Button>
        </Form>
        <Button
          className="mt-5"
          type="submit"
          onClick={() => {
            this.handleGoogleSignIn();
          }}
        >
          Sign In With Google
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

const Login = withRouter(LoginBase);

function LoginPage() {
  return (
    <FirebaseContext.Consumer>
      {(firebase) => <Login firebase={firebase} />}
    </FirebaseContext.Consumer>
  );
}

export default LoginPage;
