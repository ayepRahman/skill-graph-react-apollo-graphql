import React, { Component } from "react";
import autoBind from "react-autobind";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Container, Columns, Column, Section, Box } from "bloomer";

const ALL_USERS_QUERY = gql`
  query AllUsersQuery {
    users {
      id
      name
    }
  }
`;

export class UsersSkillGraph extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  renderUserQuery() {
    return (
      <Query query={ALL_USERS_QUERY}>
        {({ loading, error, data }) => {
          const { users } = data;

          if (loading) return <h1>LOADING!!!!!</h1>;
          if (error) return `Error!: ${error}`;

          return (
            <Column hasTextAlign="centered">
              {users.map(user => {
                return (
                  <Box key={user.id}>
                    <ul>
                      <li>{user.id}</li>
                      <li>{user.name}</li>
                    </ul>
                  </Box>
                );
              })}
            </Column>
          );
        }}
      </Query>
    );
  }

  render() {
    return (
      <Section>
        <Container>
          <Columns>{this.renderUserQuery()}</Columns>
        </Container>
      </Section>
    );
  }
}

export default UsersSkillGraph;
