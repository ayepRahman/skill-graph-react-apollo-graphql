import React, { Component } from "react";
import autoBind from "react-autobind";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Container, Columns, Column, Section } from "bloomer";
import {
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardHeader,
  ModalCardTitle,
  ModalCardBody,
  ModalCardFooter,
  Delete
} from "bloomer";
import {
  Card,
  CardHeader,
  CardHeaderTitle,
  CardContent,
  Media,
  MediaContent,
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

  renderUpdateModal(id) {
    console.log(id);
  }

  renderDeleteModal(id) {
    console.log(id);

    return <div />;
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
                          onClick={() => this.renderUpdateModal(user.id)}
                          className="has-text-link"
                        >
                          Edit
                        </CardFooterItem>
                        <CardFooterItem
                          style={{ cursor: "pointer" }}
                          onClick={() => this.renderDeleteModal(user.id)}
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
