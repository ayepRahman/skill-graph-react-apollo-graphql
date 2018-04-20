import React, { Component } from "react";
import autoBind from "react-autobind";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Container, Columns, Column, Section } from "bloomer";
import {
  Card,
  CardHeader,
  CardHeaderTitle,
  CardContent,
  Media,
  MediaContent,
  CardFooter
} from "bloomer";

import EditButton from "components/features/users/mutations/card-button/edit-button";
import DeleteButton from "components/features/users/mutations/card-button/delete-button";

export class UsersSkillGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenEdit: false,
      isOpenDelete: false
    };

    autoBind(this);
  }

  triggered() {
    alert("triggered");
  }

  toggleEditModal() {
    this.setState({
      isOpenEdit: !this.state.isOpenEdit
    });
  }

  toggleDeleteModal() {
    this.setState({
      isOpenDelete: !this.state.isOpenDelete
    });
  }

  render() {
    return (
      <Section>
        <Container>
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
                              <MediaContent>Radar Chart</MediaContent>
                            </Media>
                          </CardContent>
                          <CardFooter>
                            <EditButton entry={user} />
                            <DeleteButton entry={user} />
                          </CardFooter>
                        </Card>
                      </Column>
                    );
                  })}
                </Columns>
              );
            }}
          </Query>
        </Container>
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
