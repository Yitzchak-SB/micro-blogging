import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFileAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const SearchBar = (props) => {
  const [checked, setChecked] = useState(true);
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
          <FontAwesomeIcon icon={faSearch} />
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
        {checked ? (
          <FontAwesomeIcon icon={faUsers} />
        ) : (
          <FontAwesomeIcon icon={faFileAlt} />
        )}
      </Button>
    </div>
  );
};

export default SearchBar;
