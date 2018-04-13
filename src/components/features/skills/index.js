import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import autoBind from 'react-autobind';

import { Container, Columns, Column, Section } from 'bloomer';
import { Modal, ModalBackground, ModalCard, ModalCardBody, ModalCardFooter } from 'bloomer';
import { Button } from 'bloomer';

export class SkillGraph extends Component {
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

  renderModal() {
    const { isOpen } = this.state;

    return (
      <Modal isActive={isOpen}>
        <ModalBackground />
        <ModalCard>
          <ModalCardBody>Input Here</ModalCardBody>
          <ModalCardFooter>
            <Button isColor="success">Submit</Button>
            <Button onClick={() => this.toggleModal()} isColor="danger">
              Cancel
            </Button>
          </ModalCardFooter>
        </ModalCard>
      </Modal>
    );
  }

  render() {
    const { allUsersQuery: { loading, error } } = this.props;

    debugger;
    if (loading) {
      return (
        <div className="has-text-centered">
          <h1 className="title">LOADING~~~~</h1>
        </div>
      );
    }

    if (error) {
      return <h1>{error.message}</h1>;
    }

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

const ALL_USERS_QUERY = gql`
  query AllUsersQuery {
    allUsers(orderBy: createdAt_DESC) {
      users {
        name
      }
    }
  }
`;

const SkillGraphWithQuery = graphql(ALL_USERS_QUERY, {
  name: 'allUsersQuery',
  options: {
    fetchPolicy: 'network-only',
  },
})(SkillGraph);

export default SkillGraphWithQuery;
