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
  Delete,
  CardFooterItem
} from "bloomer";
import { Field, Control, Label, Input } from "bloomer";
import { Button } from "bloomer";

import { ALL_USERS_QUERY } from "components/pages/home/queries/user-skills";

export class UpdateUserButton extends Component {
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

  componentDidMount() {
    const {
      entry: { name }
    } = this.props;

    this.setState({
      name
    });
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

        for (var i in users) {
          if (users[i].id === updateUser.id) {
            users[i].name = updateUser.name;

            return users;
          }
        }

        cache.writeQuery({
          query: ALL_USERS_QUERY,
          data: { users: users }
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
    const { entry } = this.props;
    const { id } = entry;

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

  renderModal(entry) {
    const { id } = entry;

    return (
      <Modal isActive={this.state.isOpen}>
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

  render() {
    const { entry } = this.props;

    return (
      <div>
        <CardFooterItem
          style={{ cursor: "pointer" }}
          onClick={this.toggleModal}
          className="has-text-link"
        >
          Edit
        </CardFooterItem>
        {this.renderModal(entry)}
      </div>
    );
  }
}

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $name: String) {
    updateUser(id: $id, name: $name) {
      id
      name
    }
  }
`;

export default UpdateUserButton;
