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
  Select,
  Icon
} from "bloomer";
import { Field, Control, Label, Input } from "bloomer";
import { Button } from "bloomer";

import { ALL_USERS_QUERY } from "../queries/user-skills";

export class AddUserSkillSetsButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      name: "",
      skillName: "",
      skillLevel: 1,
      skillSetsInputs: [{ skillName: "", skillLevel: 1 }]
    };

    autoBind(this);
  }

  componentDidMount = () => {
    // query the initial value of skillset if any and set to state
  };

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleChange = index => event => {
    console.log("handleChange", event.target.value, index);
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

    console.log(skillSetsInputs);

    // await mutate({
    //   variables: { skillName, skillLevel }
    //   // TODO: add skill's to radarChart
    //   // update: (cache, { data: { addUser } }) => {
    //   //   const { users } = cache.readQuery({
    //   //     query: ALL_USERS_QUERY
    //   //   });

    //   //   cache.writeQuery({
    //   //     query: ALL_USERS_QUERY,
    //   //     data: { users: users.concat([addUser]) }
    //   //   });
    //   // }
    //   // optimisticResponse: {
    //   //   __typename: "Mutation",
    //   //   addUser: {
    //   //     __typename: ""
    //   //   }
    //   // }
    // });

    // this.setState({
    //   isOpen: !this.state.isOpen
    // });
  };

  onAddSkillSets = () => {
    console.log("onAddSkillSets");
    this.setState({
      skillSetsInputs: this.state.skillSetsInputs.concat({
        skillName: "",
        skillLevel: 1
      })
    });
  };

  onRemoveSkillSets = index => {
    console.log("onRemoveSkillSets");

    this.setState({
      skillSetsInputs: this.state.skillSetsInputs.filter(
        (skillSetInput, sIndex) => index !== sIndex
      )
    });
  };

  renderForm() {
    const { skillSetsInputs } = this.state;

    return (
      <Mutation mutation={ADD_USER_SKILL}>
        {addUser =>
          skillSetsInputs.map((skillSetInput, index) => {
            return (
              <Container key={index}>
                <form onSubmit={event => this.handleSubmit(event, addUser)}>
                  <Columns isMultiline>
                    <Column isSize={{ default: 6 }}>
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

                    <Column isSize={{ default: 4 }}>
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
                      <Icon
                        isPulled="right"
                        className="fas fa-minus-circle p-t-lg"
                        onClick={() => this.onRemoveSkillSets(index)}
                      />
                    </Column>
                  </Columns>
                </form>
              </Container>
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

        <Mutation mutation={ADD_USER_SKILL}>
          {mutate => (
            <ModalCard>
              <ModalCardHeader>
                <ModalCardTitle>Add User Skill</ModalCardTitle>
                <Delete onClick={this.toggleModal} />
              </ModalCardHeader>
              <ModalCardBody>
                <div className="p-b-xl">
                  <Icon
                    isPulled="right"
                    className="fas fa-plus-circle"
                    onClick={this.onAddSkillSets}
                  />
                </div>

                {this.renderForm()}
              </ModalCardBody>
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

export default AddUserSkillSetsButton;
