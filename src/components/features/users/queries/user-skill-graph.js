import React, { Component } from "react";
import autoBind from "react-autobind";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Container, Columns, Column, Section, Box } from "bloomer";
import {
  Title,
  Card,
  CardHeader,
  CardHeaderTitle,
  CardContent,
  Media,
  MediaContent,
  Content,
  CardFooter,
  CardFooterItem
} from "bloomer";

export class UsersSkillGraph extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  triggered() {
    alert("triggered");
  }

  renderUserQuery() {
    return (
      <Query query={ALL_USERS_QUERY}>
        {({ loading, error, data }) => {
          const { users } = data;

          if (loading) return <h1>LOADING!!!!!</h1>;
          if (error) return `Error!: ${error}`;

          return (
            <Columns isMultiline>
              {users.map(user => {
                return (
                  <Column key={user.id} isSize="1/3">
                    <Card>
                      <CardHeader hasTextAlign="centered">
                        <CardHeaderTitle>{user.name}</CardHeaderTitle>
                      </CardHeader>
                      <CardContent>
                        <Media>
                          <MediaContent>user skill graph here</MediaContent>
                        </Media>
                      </CardContent>
                      <CardFooter>
                        <CardFooterItem
                          style={{ cursor: "pointer" }}
                          onClick={this.triggered}
                          className="has-text-link"
                        >
                          Edit
                        </CardFooterItem>
                        <CardFooterItem
                          style={{ cursor: "pointer" }}
                          onClick={this.triggered}
                          className="has-text-danger"
                        >
                          Delete
                        </CardFooterItem>
                      </CardFooter>
                    </Card>
                  </Column>
                );
              })}
            </Columns>
          );
        }}
      </Query>
    );
  }

  render() {
    return (
      <Section>
        <Container>{this.renderUserQuery()}</Container>
      </Section>
    );
  }
}

export const ALL_USERS_QUERY = gql`
  query allUsersQuery {
    users {
      id
      name
    }
  }
`;

export default UsersSkillGraph;
