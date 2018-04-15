import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import autoBind from 'react-autobind';

import { Container, Columns, Column, Section } from 'bloomer';
import { Modal, ModalBackground, ModalCard, ModalCardBody, ModalCardFooter } from 'bloomer';
import { Field, FieldBody, FieldLabel, Control, Label, Input } from 'bloomer';
import { Button } from 'bloomer';

export class AddNewUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    autoBind(this);
  }

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  handleSubmit(e) {
    const { mutate } = this.props;

    debugger;
    console.log('====================================');
    console.log(mutate);
    console.log('====================================');
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Field>
          <Label>Name</Label>
          <Control>
            <Input type="text" placeholder="Text Input" />
          </Control>
        </Field>
      </form>
    );
  }

  renderModal() {
    return (
      <Modal isActive={this.state.isOpen}>
        <ModalBackground />
        <ModalCard>
          <ModalCardBody>{this.renderForm()}</ModalCardBody>
          <ModalCardFooter>
            <Button onSubmit={this.handleSubmit} isColor="primary" isOutlined>
              Submit
            </Button>
            <Button onClick={() => this.toggleModal()} isColor="danger" isOutlined>
              Cancel
            </Button>
          </ModalCardFooter>
        </ModalCard>
      </Modal>
    );
  }

  render() {
    return (
      <Section>
        <Container>
          <Columns isCentered>
            <Column hasTextAlign="centered">
              <Button onClick={() => this.toggleModal()} isColor="primary">
                Add Skill
              </Button>
              {this.renderModal()}
            </Column>
          </Columns>
        </Container>
      </Section>
    );
  }
}

const ADD_NEW_USER = gql`
  mutation addNewUser($name: String!) {
    addNewUser(name: $name) {
      id
      name
    }
  }
`;

const AddNewUserWithMutation = graphql(ADD_NEW_USER)(AddNewUser);

export default AddNewUserWithMutation;
