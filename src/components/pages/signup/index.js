import React, { Component } from "react";
import autoBind from "react-autobind";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { checkPasswordStrength } from "./scorePassword";

import {
  Container,
  Section,
  Columns,
  Column,
  Box,
  Title,
  Subtitle,
  Help,
  Progress
} from "bloomer";
import { Field, Label, Control, Input, Button, Notification } from "bloomer";

export class SignUpPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      errors: [],
      passwordStrength: {}
    };

    autoBind(this);
  }

  handleChange(event) {
    // handling password strength if password
    if (event.target.name === "password") {
      const passwordStrength = checkPasswordStrength(event.target.value);

      this.setState({
        passwordStrength
      });
    }
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async (event, mutate) => {
    const { name, email, password } = this.state;
    event.preventDefault();

    const response = await mutate({
      variables: { name, email, password }
    });

    const { ok, errors } = response.data.register;

    if (ok) {
      this.props.history.push("/");
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });

      this.setState({
        errors: err
      });
    }
  };

  progressPasswordBar(passwordStrength) {
    return (
      <div className="p-t-md">
        <Progress
          className=" is-marginless"
          isSize="small"
          isColor={
            passwordStrength.strength === "weak"
              ? "danger"
              : passwordStrength.strength === "good"
                ? "warning"
                : passwordStrength.strength === "strong"
                  ? "primary"
                  : passwordStrength.strength === "very strong"
                    ? "success"
                    : ""
          }
          value={passwordStrength.score}
          max={100}
        />
        <p
          className={
            passwordStrength.strength === "weak"
              ? "has-text-danger"
              : passwordStrength.strength === "good"
                ? "has-text-warning"
                : passwordStrength.strength === "strong"
                  ? "has-text-primary"
                  : passwordStrength.strength === "very strong"
                    ? "has-text-success"
                    : ""
          }
        >
          {passwordStrength.strength}
        </p>
      </div>
    );
  }

  renderForm() {
    const { name, email, password, errors, passwordStrength } = this.state;
    const { nameError, emailError, passwordError } = errors;
    const isDisabled = name && email && password;

    return (
      <Mutation mutation={REGISTER_NEW_USER}>
        {(mutate, { data, loading, error }) => {
          return (
            <form onSubmit={event => this.handleSubmit(event, mutate)}>
              {error && <Notification isColor="danger">{error}</Notification>}
              <Field>
                <Label isPulled="left">Username</Label>
                <Control>
                  <Input
                    className={!!nameError ? "input is-danger" : ""}
                    name="name"
                    type="text"
                    placeholder="Username"
                    value={this.state.name}
                    onChange={this.handleChange}
                    required
                  />
                </Control>
                {!!nameError && <Help isColor="danger">{nameError}</Help>}
              </Field>
              <Field>
                <Label isPulled="left">Email</Label>
                <Control>
                  <Input
                    className={!!emailError ? "input is-danger" : ""}
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                  />
                </Control>
                {!!emailError && <Help isColor="danger">{emailError}</Help>}
              </Field>
              <Field>
                <Label isPulled="left">Password</Label>
                <Control>
                  <Input
                    className={!!passwordError ? "input is-danger" : ""}
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                  />
                </Control>
                {!!passwordError && (
                  <Help isColor="danger">{passwordError}</Help>
                )}

                {passwordStrength && this.progressPasswordBar(passwordStrength)}
              </Field>

              <Field isGrouped>
                <Control>
                  <Button
                    onClick={event => this.handleSubmit(event, mutate)}
                    isColor="primary"
                    disabled={!isDisabled}
                    isLoading={loading}
                  >
                    Register
                  </Button>
                </Control>
                <Control>
                  <p>
                    already a user? <Link to="/">login</Link> instead.
                  </p>
                </Control>
              </Field>
            </form>
          );
        }}
      </Mutation>
    );
  }

  render() {
    return (
      <Section className="is-primary">
        <Container>
          <Columns isCentered>
            <Column hasTextAlign="centered">
              <Title hasTextColor="primary" isSize={1}>
                Skill Graph
              </Title>
              <Subtitle hasTextColor="primary">
                <span aria-label="Rocket" role="img">
                  🚀
                </span>
                Most Best Skill Graph ever using Apollo,React,Graphql and
                MongoDB
                <span aria-label="Rocket" role="img">
                  🚀
                </span>
              </Subtitle>
            </Column>
          </Columns>

          <Columns isCentered>
            <Column hasTextAlign="centered">
              <Title>Sign up</Title>
            </Column>
          </Columns>

          <Columns isCentered>
            <Column isSize="1/2">
              <Box>{this.renderForm()}</Box>
            </Column>
          </Columns>
        </Container>
      </Section>
    );
  }
}

export const REGISTER_NEW_USER = gql`
  mutation register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default SignUpPage;
