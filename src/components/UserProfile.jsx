import React from "react";
import { Form, Button } from "react-bootstrap";
import UserContext from "./data/UserContext";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userName: "" };
  }

  handleOnSubmit(event) {
    event.preventDefault();
    this.props.setName(this.state.userName);
    this.setState({ userName: "" });
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
                this.handleOnSubmit(event);
              }}
            ></Form.Control>
          </Form.Group>
          <Button
            type="submit"
            className="float-right"
            onClick={(event) => {
              this.handleOnSubmit(event);
            }}
          >
            Save
          </Button>
        </Form>
      </>
    );
  }
}

UserProfile.contextType = UserContext;
export default UserProfile;
