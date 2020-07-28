import React from "react";
import { Card } from "react-bootstrap";

export function PostFeed(props) {
  const tweets = props.data.map((item) => {
    return (
      <li key={item.date}>
        <Card
          style={{
            padding: 15,
            marginTop: 15,
            backgroundColor: "#343A40",
            border: "none",
            minHeight: 100,
          }}
        >
          <div className="d-flex justify-content-between">
            <span className="text-muted float-left">{item.user}</span>
            <span className="text-muted float-right">{item.date}</span>
          </div>
          <p className="text-white pt-5">{item.body}</p>
        </Card>
      </li>
    );
  });
  return props.data && <ul>{tweets}</ul>;
}
