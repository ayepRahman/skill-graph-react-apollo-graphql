import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import autoBind from "react-autobind";

import { Container, Columns, Column, Section } from "bloomer";
import {
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardHeader,
  ModalCardTitle,
  ModalCardBody,
  ModalCardFooter,
  Delete
} from "bloomer";
import { Field, Control, Label, Input } from "bloomer";
import { Button } from "bloomer";

import { ALL_USERS_QUERY } from "components/features/users/queries/user-skill-graph";

export class AddNewUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      name: "",
      skill: "",
      skill_level: ""
    };

    autoBind(this);
  }

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async (event, mutate) => {
    const { name } = this.state;
    event.preventDefault();

    await mutate({
      variables: { name },
      update: (cache, { data: { addUser } }) => {
        const { users } = cache.readQuery({
          query: ALL_USERS_QUERY
        });

        cache.writeQuery({
          query: ALL_USERS_QUERY,
          data: { users: users.concat([addUser]) }
        });
      }
      // optimisticResponse: {
      //   __typename: "Mutation",
      //   addUser: {
      //     __typename: ""
      //   }
      // }
    });

    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  renderForm() {
    return (
      <Mutation mutation={ADD_NEW_USER}>
        {addUser => (
          <div>
            <form onSubmit={event => this.handleSubmit(event, addUser)}>
              <Field>
                <Label isPulled="left">Name</Label>
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
            </form>
          </div>
        )}
      </Mutation>
    );
  }

  renderModal() {
    return (
      <Modal isActive={this.state.isOpen}>
        <ModalBackground />

        <Mutation mutation={ADD_NEW_USER}>
          {mutate => (
            <ModalCard>
              <ModalCardHeader>
                <ModalCardTitle>Add User Skill</ModalCardTitle>
                <Delete onClick={this.toggleModal} />
              </ModalCardHeader>
              <ModalCardBody>{this.renderForm()}</ModalCardBody>
              <ModalCardFooter>
                <Button
                  onClick={event => this.handleSubmit(event, mutate)}
                  isColor="primary"
                  isOutlined
                >
                  Save
                </Button>
                <Button onClick={this.toggleModal} isColor="danger" isOutlined>
                  Cancel
                </Button>
              </ModalCardFooter>
            </ModalCard>
          )}
        </Mutation>
      </Modal>
    );
  }

  render() {
    return (
      <Section>
        <Container>
          <Columns isCentered>
            <Column hasTextAlign="centered">
              <Button
                isSize="medium"
                onClick={() => this.toggleModal()}
                isColor="primary"
              >
                Add Skill
              </Button>
              {this.renderModal2()}
            </Column>
          </Columns>
        </Container>
      </Section>
    );
  }
}

export const ADD_NEW_USER = gql`
  mutation addUser($name: String!) {
    addUser(name: $name) {
      id
      name
    }
  }
`;

export default AddNewUser;
