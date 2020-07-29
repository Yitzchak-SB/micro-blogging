import React from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import MainFeed from "./components/MainFeed";
import UserContext from "./components/data/UserContext";

function App() {
  return (
    <Container
      fluid={true}
      style={{ backgroundColor: "#15202B", minHeight: "100vh" }}
    >
      <UserContext.Provider value={{ name: "Omer" }}>
        <MainFeed />
      </UserContext.Provider>
    </Container>
  );
}

export default App;
