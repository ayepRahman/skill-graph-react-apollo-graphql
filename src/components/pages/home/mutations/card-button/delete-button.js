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
// import { Field, Control, Label, Input } from "bloomer";
import { Button } from "bloomer";

import { ALL_USERS_QUERY } from "components/pages/home/queries/user-skills";

export class DeleteUserButton extends Component {
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
      update: (cache, { data: { deleteUser } }) => {
        const { users } = cache.readQuery({
          query: ALL_USERS_QUERY
        });

        debugger;
        for (var i in users) {
          let obj = users[i];

          if (obj.id === deleteUser.id) {
            users.splice(users.indexOf(obj), 1);
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

  renderModal(entry) {
    const { id, name } = entry;

    return (
      <Modal isActive={this.state.isOpen}>
        <ModalBackground />
        <Mutation mutation={DELETE_USER}>
          {mutate => (
            <ModalCard>
              <ModalCardHeader>
                <ModalCardTitle>Delete User</ModalCardTitle>
                <Delete onClick={this.toggleModal} />
              </ModalCardHeader>
              <ModalCardBody>
                {`Hey ${name}, you sure you wanna delete?`}
              </ModalCardBody>
              <ModalCardFooter>
                <Button
                  onClick={event => this.handleSubmit(event, { mutate, id })}
                  isColor="primary"
                  isOutlined
                >
                  Confirm
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
          className="has-text-danger"
        >
          Delete
        </CardFooterItem>
        {this.renderModal(entry)}
      </div>
    );
  }
}

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
    }
  }
`;

export default DeleteUserButton;
