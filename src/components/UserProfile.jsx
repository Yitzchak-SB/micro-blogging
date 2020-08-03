import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import UserContext from "./data/UserContext";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userName: "", profilePic: "", error: null };
  }

  handleOnUsernameSubmit(event) {
    event.preventDefault();
    //this.props.setName(this.state.userName);
    this.setState({ userName: "" });
  }

  handleOnProfilePicSubmit(event) {
    event.preventDefault();
    const userId = this.context.user.userId;
    const fileName = this.state.profilePic.name;
    const ref = this.props.firebase.profile(fileName, userId);
    try {
      ref.put(this.state.profilePic).then(function (snapshot) {
        console.log("Uploaded a blob or file!");
      });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    return (
      <>
        <h1 className="text-white pt-5 pb-5">Profile</h1>
        <Form>
          <Form.Group>
            <Form.Label className="text-white">UserName</Form.Label>
            <Form.Control
              onChange={(event) => {
                this.setState({ userName: event.target.value });
              }}
              value={this.state.userName}
              style={{
                color: "white",
                backgroundColor: "#15202B",
                border: "1px solid white",
              }}
              type="text"
              onSubmit={(event) => {
                this.handleOnUsernameSubmit(event);
              }}
            ></Form.Control>
          </Form.Group>
          <Button
            type="submit"
            className="float-right"
            onClick={(event) => {
              this.handleOnUsernameSubmit(event);
            }}
          >
            Save
          </Button>
        </Form>
        <hr />
        <Form>
          <Form.Group>
            <Form.Label className="text-white">Profile Picture</Form.Label>
            <Form.Control
              style={{
                color: "white",
                backgroundColor: "#15202B",
                border: "1px solid white",
              }}
              type="file"
              onChange={(event) => {
                this.setState({ profilePic: event.target.files[0] });
              }}
              onSubmit={(event) => {
                this.handleOnProfilePicSubmit(event);
              }}
            />
          </Form.Group>
          <Button
            type="submit"
            className="float-right"
            onClick={(event) => {
              this.handleOnProfilePicSubmit(event);
            }}
          >
            Save
          </Button>
        </Form>
        {this.state.error && (
          <Alert className="mt-4" variant="light">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{this.state.error.message}</p>
          </Alert>
        )}
      </>
    );
  }
}

UserProfile.contextType = UserContext;
export default UserProfile;
