import React from "react";
import { Container } from "semantic-ui-react";

const HomePage = () => {
  return (
    <Container>
      <h2>
        Welcome to
      </h2>
      <h1 size="huge" color="red" data-cy="resturant-name" textAlign="centered">
        Too Gross For Comfort?
      </h1>
      <h2>
        A unique blend of the world's weirdest cuisines.
      </h2>
    </Container>
  );
};

export default HomePage;
