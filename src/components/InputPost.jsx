import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

class InputPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  render() {
    const { checked } = this.props;
    const overText = this.state.input.length > 140;
    return (
      <Card
        className={`border  rounded m-1 ${
          checked ? "all-tweets border-white" : "my-tweets border-dark"
        }`}
      >
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Control
                as="textarea"
                value={this.state.input}
                onChange={(event) => {
                  this.setState({ input: event.target.value });
                }}
                className={`${checked ? "all-tweets" : "my-tweets"}`}
                style={{
                  height: 180,
                  border: "none",
                  resize: "none",
                }}
              />
            </Form.Group>

            {overText && (
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
              </>
            )}
            <Button
              disabled={overText}
              inline="true"
              onClick={(event) => {
                this.props.handleOnClick(event, this.state.input);
                this.setState({ input: "" });
              }}
              className="float-right"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default InputPost;
