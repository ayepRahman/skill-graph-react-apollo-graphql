import React, { Component } from "react";
import autoBind from "react-autobind";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

import {
  Container,
  Section,
  Columns,
  Column,
  Box,
  Title,
  Subtitle
} from "bloomer";

import { Field, Label, Control, Input, Button, Notification } from "bloomer";

export class SignUpPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: ""
    };

    autoBind(this);
  }

  componentWillMount() {
    this;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async (event, mutate) => {
    const { name, email, password } = this.state;
    event.preventDefault();

    await mutate({
      variables: { name, email, password }
    });

    // name = "";
    // email = "";
    // password = "";

    this.props.history.push("/login");
  };

  renderForm() {
    const { name, email, password } = this.state;
    const isDisabled = name && email && password;

    return (
      <Mutation mutation={REGISTER_NEW_USER}>
        {(mutate, { data, loading, error }) => {
          debugger;
          return (
            <form onSubmit={event => this.handleSubmit(event, mutate)}>
              {error && <Notification isColor="danger">{error}</Notification>}
              <Field>
                <Label isPulled="left">Username</Label>
                <Control>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Username"
                    value={this.state.name}
                    onChange={this.handleChange}
                    required
                  />
                </Control>
              </Field>
              <Field>
                <Label isPulled="left">Email</Label>
                <Control>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                  />
                </Control>
              </Field>
              <Field>
                <Label isPulled="left">Password</Label>
                <Control>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                  />
                </Control>
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
                    already a user? <Link to="/login">login</Link> instead.
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
      id
      name
      email
    }
  }
`;

export default SignUpPage;
