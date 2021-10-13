import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "semantic-ui-react";
import auth from '../modules/auth'

const HomePage = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { showLogin } = useSelector((state) => state);
  const handleAuthentication = async () => {
    let response = await auth.signIn(email, password)
    dispatch({type: 'SET_CURRENT_USER', payload: response.data})
  }
  return (
    <Container>
      {showLogin ? (
        <React.Fragment>
          <h2>Login to the application</h2>
          <input
            type="text"
            data-cy="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            data-cy="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button data-cy="login-submit" onClick={() => handleAuthentication()}>Login</button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h2>Welcome to</h2>
          <h1
            size="huge"
            color="red"
            data-cy="resturant-name"
            textAlign="centered"
          >
            Too Gross For Comfort?
          </h1>
          <h2>A unique blend of the world's weirdest cuisines.</h2>
        </React.Fragment>
      )}
    </Container>
  );
};

export default HomePage;
