import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import autoBind from 'react-autobind';

import { Container, Columns, Column, Section } from 'bloomer';
import { Modal, ModalBackground, ModalCard, ModalCardBody, ModalCardFooter } from 'bloomer';
import { Button } from 'bloomer';

import UsersSkillGraph from './query/user-skill-graph';
import AddNewUserSkills from './mutation/add-new-user-skill';

export class SkillGraph extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  render() {
    const { allUsersQuery: { loading, error, users } } = this.props;

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
              <AddNewUserSkills />
            </Column>
          </Columns>
        </Container>

        <Container>
          <Columns isCentered>
            <Column hasTextAlign="centered">
              {users && users.length > 0 && <UsersSkillGraph users={users} />}
            </Column>
          </Columns>
        </Container>
      </Section>
    );
  }
}

const ALL_USERS_QUERY = gql`
  query AllUsersQuery {
    users {
      id
      name
    }
  }
`;

export const SkillGraphWithQuery = graphql(ALL_USERS_QUERY, {
  name: 'allUsersQuery',
  options: {
    fetchPolicy: 'network-only',
  },
})(SkillGraph);

export default SkillGraphWithQuery;
