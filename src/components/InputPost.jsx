import React from "react";
import { Card, Button, Form } from "react-bootstrap";

class InputPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  render() {
    return (
      <Card
        className="border border-white rounded m-1"
        style={{ backgroundColor: "#15202B" }}
      >
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Control
                className="text-white"
                as="textarea"
                value={this.state.input}
                onChange={(event) => {
                  this.setState({ input: event.target.value });
                }}
                style={{
                  height: 180,
                  backgroundColor: "#15202B",
                  border: "none",
                  resize: "none",
                }}
              />
            </Form.Group>

            {this.state.input.length > 140 && (
              <>
                <span
                  className="rounded float-left"
                  style={{
                    color: "#721C24",
                    backgroundColor: "#F8D7DA",
                    padding: 8,
                    marginTop: 0,
                  }}
                >
                  The tweet can't contain more then 140 chars.
                </span>
                <Button
                  disabled={true}
                  inline="true"
                  onClick={(event) => {
                    this.props.handleOnClick(event, this.state.input);
                    this.setState({ input: "" });
                  }}
                  className="float-right"
                >
                  Tweet
                </Button>
              </>
            )}

            {this.state.input.length <= 140 && (
              <Button
                onClick={(event) => {
                  this.props.handleOnClick(event, this.state.input);
                  this.setState({ input: "" });
                }}
                className="float-right"
              >
                Tweet
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default InputPost;
