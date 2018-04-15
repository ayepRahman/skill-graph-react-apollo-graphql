import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import autoBind from 'react-autobind';

import { Container, Columns, Column, Section } from 'bloomer';
import { Modal, ModalBackground, ModalCard, ModalCardBody, ModalCardFooter } from 'bloomer';
import { Button } from 'bloomer';

export class UsersSkillGraph extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  render() {
    const { users } = this.props;

    return (
      <Section>
        <Container>
          <Columns isCentered>
            <Column hasTextAlign="centered">
              {users &&
                users.map(user => {
                  return (
                    <ul key={user.id} style={{ padding: '1rem' }}>
                      <li>{`User Id: ${user.id}`}</li>
                      <li>{`Name: ${user.name}`}</li>
                    </ul>
                  );
                })}
            </Column>
          </Columns>
        </Container>
      </Section>
    );
  }
}

export default UsersSkillGraph;
