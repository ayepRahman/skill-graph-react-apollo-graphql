import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import autoBind from "react-autobind";

import { Container, Columns, Column } from "bloomer";
import {
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardHeader,
  ModalCardTitle,
  ModalCardBody,
  ModalCardFooter,
  Delete,
  Select
} from "bloomer";
import { Field, Control, Label, Input } from "bloomer";
import { Button } from "bloomer";

import { ALL_USERS_QUERY } from "components/pages/home/queries/user-skills";

export class AddUserSkill extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      name: "",
      skillName: "",
      skillLevel: 1
    };

    autoBind(this);
  }

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleChange(event) {
    console.log(event.target.value);

    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async (event, mutate) => {
    const { skillName, skillLevel } = this.state;
    event.preventDefault();

    await mutate({
      variables: { skillName, skillLevel }
      // TODO: add skill's to radarChart
      // update: (cache, { data: { addUser } }) => {
      //   const { users } = cache.readQuery({
      //     query: ALL_USERS_QUERY
      //   });

      //   cache.writeQuery({
      //     query: ALL_USERS_QUERY,
      //     data: { users: users.concat([addUser]) }
      //   });
      // }
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
      <Mutation mutation={ADD_USER_SKILL}>
        {addUser => (
          <div>
            <form onSubmit={event => this.handleSubmit(event, addUser)}>
              <Field>
                <Label isPulled="left">Skill</Label>
                <Control>
                  <Input
                    name="skillName"
                    type="text"
                    placeholder="Skill Name"
                    value={this.state.skillName}
                    onChange={this.handleChange}
                    required
                  />
                </Control>
              </Field>
              <Field>
                <Label>Expertise</Label>
                <Control>
                  <Select
                    value={this.state.skillLevel}
                    onChange={this.handleChange}
                    name="skillLevel"
                  >
                    <option value={1}>Beginner</option>
                    <option value={2}>Intermediate</option>
                    <option value={3}>Expert</option>
                  </Select>
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

        <Mutation mutation={ADD_USER_SKILL}>
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
            {this.renderModal()}
          </Column>
        </Columns>
      </Container>
    );
  }
}

export const ADD_USER_SKILL = gql`
  mutation addUserSkill($skillName: String!, $skillLevel: Int!) {
    addUserSkill(skillName: $skillName, skillLevel: $skillLevel) {
      skillName
      skillLevel
    }
  }
`;

export default AddUserSkill;
