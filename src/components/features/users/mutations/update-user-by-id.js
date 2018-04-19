import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import autoBind from "react-autobind";

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

export class UpdateUser extends Component {
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

  handleSubmit = async (event, { mutate, id }) => {
    const { name } = this.state;
    event.preventDefault();

    await mutate({
      variables: { id, name },
      update: (cache, { data: { updateUser } }) => {
        const { users } = cache.readQuery({
          query: ALL_USERS_QUERY
        });

        cache.writeQuery({
          query: ALL_USERS_QUERY,
          data: { users: users.concat([updateUser]) }
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
    const { id } = this.props;

    return (
      <Mutation mutation={UPDATE_USER}>
        {mutate => (
          <div>
            <form onSubmit={event => this.handleSubmit(event, { mutate, id })}>
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

  render() {
    const { isOpen, id } = this.props;

    return (
      <Modal isActive={isOpen}>
        <ModalBackground />

        <Mutation mutation={UPDATE_USER}>
          {mutate => (
            <ModalCard>
              <ModalCardHeader>
                <ModalCardTitle>Update User</ModalCardTitle>
                <Delete onClick={this.toggleModal} />
              </ModalCardHeader>
              <ModalCardBody>{this.renderForm()}</ModalCardBody>
              <ModalCardFooter>
                <Button
                  onClick={event => this.handleSubmit(event, { mutate, id })}
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
}

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!) {
    updateUser(id: $id) {
      id
      name
    }
  }
`;

export default UpdateUser;
