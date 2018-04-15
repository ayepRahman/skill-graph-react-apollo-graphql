import React, { Component } from 'react';
import {} from 'react-apollo';
import gql from 'graphql-tag';
import autoBind from 'react-autobind';

import { Container, Columns, Column, Section } from 'bloomer';
import { Modal, ModalBackground, ModalCard, ModalCardBody, ModalCardFooter } from 'bloomer';
import { Field, FieldBody, FieldLabel, Control, Label, Input } from 'bloomer';
import { Button } from 'bloomer';

export class AddNewUserSkills extends Component {
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

  renderForm() {
    return (
      <Field>
        <Label>Name</Label>
        <Control>
          <Input type="text" placeholder="Text Input" />
        </Control>
      </Field>
    );
  }

  renderModal() {
    return (
      <Modal isActive={this.state.isOpen}>
        <ModalBackground />
        <ModalCard>
          <ModalCardBody>{this.renderForm()}</ModalCardBody>
          <ModalCardFooter>
            <Button isColor="primary" isOutlined>
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

export default AddNewUserSkills;
