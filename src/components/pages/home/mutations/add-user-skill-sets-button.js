import React, { Component } from "react";
import { Mutation, withApollo } from "react-apollo";
import gql from "graphql-tag";
import autoBind from "react-autobind";

import { Container, Columns, Column, Notification } from "bloomer";
import {
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardHeader,
  ModalCardTitle,
  ModalCardBody,
  ModalCardFooter,
  Delete,
  Select,
  Icon
} from "bloomer";
import { Field, Control, Label, Input } from "bloomer";
import { Button } from "bloomer";

export class AddUserSkillSetsButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      name: "",
      skillSetsInputs: [{ skillName: "", skillLevel: 1 }]
    };

    autoBind(this);
  }

  componentDidMount = async () => {
    const { client } = this.props;
    try {
      const response = await client.query({
        query: gql`
          query getUserSkillSets {
            getUserSkillSets {
              skillName
              skillLevel
            }
          }
        `
      });

      if (response.error) {
        console.log(response.error);
      } else {
        this.setState({
          skillSetsInputs: response.data.getUserSkillSets
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleChange = index => event => {
    const newSkillSetsInputs = this.state.skillSetsInputs.map(
      (skillSetInput, sIndex) => {
        if (index !== sIndex) return skillSetInput;
        return { ...skillSetInput, [event.target.name]: event.target.value };
      }
    );

    this.setState({
      skillSetsInputs: newSkillSetsInputs
    });
  };

  handleSubmit = async (event, mutate) => {
    const { skillSetsInputs } = this.state;
    event.preventDefault();

    await mutate({
      variables: { skillSets: skillSetsInputs }
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

  onAddSkillSetsRow = () => {
    this.setState({
      skillSetsInputs: this.state.skillSetsInputs.concat({
        skillName: "",
        skillLevel: 1
      })
    });
  };

  onRemoveSkillSetsRow = index => {
    this.setState({
      skillSetsInputs: this.state.skillSetsInputs.filter(
        (skillSetInput, sIndex) => index !== sIndex
      )
    });
  };

  renderForm() {
    const { skillSetsInputs } = this.state;

    return (
      <Mutation mutation={ADD_USER_SKILLS_SETS}>
        {(mutate, { error }) =>
          skillSetsInputs.map((skillSetInput, index) => {
            return (
              <Columns
                key={index}
                onSubmit={event => this.handleSubmit(event, mutate)}
                isFullWidth
              >
                <Column isSize={{ default: 5 }}>
                  <Field>
                    <Label isPulled="left">Skill</Label>
                    <Control>
                      <Input
                        name="skillName"
                        type="text"
                        placeholder="Skill Name"
                        value={skillSetInput.skillName}
                        onChange={this.handleChange(index)}
                        required
                      />
                    </Control>
                  </Field>
                </Column>

                <Column isSize={{ default: 5 }}>
                  <Field>
                    <Label isPulled="left">Expertise</Label>
                    <Control isDisplay="block">
                      <Select
                        isFullWidth
                        value={skillSetInput.skillLevel}
                        onChange={this.handleChange(index)}
                        name="skillLevel"
                      >
                        <option value={1}>Beginner</option>
                        <option value={2}>Intermediate</option>
                        <option value={3}>Expert</option>
                      </Select>
                    </Control>
                  </Field>
                </Column>

                <Column isPulled="right" isSize={{ default: 2 }}>
                  <div className="p-t-lg">
                    <Icon
                      style={{ cursor: "pointer" }}
                      isPulled="right"
                      className="fa fa-minus-circle"
                      onClick={() => this.onRemoveSkillSetsRow(index)}
                    />
                  </div>
                </Column>
              </Columns>
            );
          })
        }
      </Mutation>
    );
  }

  renderModal() {
    return (
      <Modal isActive={this.state.isOpen}>
        <ModalBackground />

        <Mutation mutation={ADD_USER_SKILLS_SETS}>
          {(mutate, { loading, error }) => {
            console.log("loading", loading);
            if (error) {
              console.log(error.graphQLErrors[0].message);
            }

            return (
              <ModalCard>
                <ModalCardHeader>
                  <ModalCardTitle>Add User Skill</ModalCardTitle>
                  <Delete onClick={this.toggleModal} />
                </ModalCardHeader>
                <ModalCardBody>
                  {error && (
                    <Columns isFullWidth>
                      <Column isDisplay={{ default: "full" }}>
                        <Notification isColor="danger">
                          {error.graphQLErrors[0].message}
                        </Notification>
                      </Column>
                    </Columns>
                  )}

                  <Columns isFullWidth>
                    <Column isDisplay={{ default: "full" }}>
                      <Icon
                        style={{ cursor: "pointer" }}
                        isPulled="right"
                        className="fas fa-plus-circle fa-1x"
                        onClick={this.onAddSkillSetsRow}
                      />
                    </Column>
                  </Columns>

                  {this.renderForm()}
                </ModalCardBody>
                <ModalCardFooter>
                  <Button
                    isLoading={loading}
                    disabled={loading}
                    onClick={event => this.handleSubmit(event, mutate)}
                    isColor="primary"
                    isOutlined
                  >
                    Save
                  </Button>
                  <Button
                    onClick={this.toggleModal}
                    isColor="danger"
                    isOutlined
                  >
                    Cancel
                  </Button>
                </ModalCardFooter>
              </ModalCard>
            );
          }}
        </Mutation>
      </Modal>
    );
  }

  render() {
    console.log(this.state.skillSetsInputs.length);
    const { skillSetsInputs } = this.state;

    return (
      <Container>
        <Columns isCentered>
          <Column hasTextAlign="centered">
            <Button
              isSize="medium"
              onClick={() => this.toggleModal()}
              isColor="primary"
            >
              {skillSetsInputs.length > 1 && skillSetsInputs[0].skillName !== ""
                ? "Update Skill Sets"
                : "Add Skill Sets"}
            </Button>
            <div>{this.renderModal()}</div>
          </Column>
        </Columns>
      </Container>
    );
  }
}

export const ADD_USER_SKILLS_SETS = gql`
  mutation addUserSkillSets($skillSets: [SkillOption]) {
    addUserSkillSets(skillSets: $skillSets) {
      skillName
      skillLevel
    }
  }
`;

export default withApollo(AddUserSkillSetsButton);
