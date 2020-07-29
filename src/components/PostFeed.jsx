import React from "react";
import { Card } from "react-bootstrap";

function buildPostFeed(data) {
  let result = [];
  for (let key in data) {
    const tweet = (
      <li key={data[key].id}>
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
            <span className="text-muted float-left">{data[key].userName}</span>
            <span className="text-muted float-right">{data[key].date}</span>
          </div>
          <p className="text-white pt-5">{data[key].content}</p>
        </Card>
      </li>
    );
    result.push(tweet);
  }
  return result;
}

export function PostFeed(props) {
  const tweets = buildPostFeed(props.data);
  return props.data && <ul>{tweets}</ul>;
}
