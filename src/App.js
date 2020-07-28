import React from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import MainFeed from "./components/MainFeed";
import userContext from "./components/data/userContext";

function App() {
  return (
    <Container
      fluid={true}
      style={{ backgroundColor: "#15202B", minHeight: "100vh" }}
    >
      <userContext.Provider value={{ name: "Omer" }}>
        <MainFeed />
      </userContext.Provider>
    </Container>
  );
}

export default App;
