import axios from "axios";
import React, { useState } from "react";
import { Container, Modal, Form, Input, Button } from "semantic-ui-react";
import { validateEmail } from "./validateEmail";

const Signup = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [validEmail, setValidEmail] = useState(true);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios({
      method: "post",
      url: "https://desolate-beach-43985.herokuapp.com/api/auth/",
      params: {
        email: userEmail,
        password: userPassword,
        password_confirmation: userConfirmPassword,
      },
    }).then((response) => {
      if (response.data.status === "success") {
        setOpen(true);
      }
    });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Field
          data-cy="email-input"
          control={Input}
          label="Email"
          id="form-input-control-error-email"
          placeholder="example@email.com"
          value={userEmail}
          onChange={(e) => {
            let inputValue = e.target.value.toLowerCase();
            setUserEmail(inputValue);
            setValidEmail(validateEmail(inputValue));
          }}
          error={
            validEmail
              ? null
              : {
                  content: "Please enter a valid email address",
                  pointing: "below",
                }
          }
        />
        <Form.Field
          data-cy="password-input"
          control={Input}
          label="Password"
          value={userPassword}
          type="password"
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <Form.Field
          data-cy="confirm-password-input"
          control={Input}
          label="Confirm Password"
          value={userConfirmPassword}
          type="password"
          onChange={(e) => setUserConfirmPassword(e.target.value)}
        />
        <Form.Field
          data-cy="btn-signup"
          id="form-button-control-public"
          control={Button}
          content="Submit"
        />
      </Form>
      <Modal
        basic
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="small"
      >
        <Modal.Content>
          <h1 data-cy="registration-message">Registration successful</h1>
        </Modal.Content>
      </Modal>
    </Container>
  );
};

export default Signup;
