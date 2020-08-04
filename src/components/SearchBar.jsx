import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBar = (props) => {
  const [checked, setChecked] = useState(false);
  const [input, setInput] = useState("");
  const handleOnSearch = (event) => {
    event.preventDefault();
    props.context.setSearch(input);
    setInput("");
  };
  const handleOnClick = () => {
    props.context.setSearchUsers();
    if (checked) return setChecked(false);
    return setChecked(true);
  };
  return (
    <div className="d-flex">
      <Form inline>
        <Button
          onClick={(event) => {
            handleOnSearch(event);
          }}
          type="Submit"
        >
          Search
        </Button>
        <Form.Group>
          <Form.Control
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
            type="text"
          />
        </Form.Group>
      </Form>
      <Button onClick={handleOnClick} type="click">
        {checked ? "Users" : "Tweets"}
      </Button>
    </div>
  );
};

export default SearchBar;
