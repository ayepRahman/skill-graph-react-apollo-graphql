import React, { Component } from "react";
// import { graphql } from "react-apollo";
// import gql from "graphql-tag";
// import autoBind from "react-autobind";

import { Container, Columns, Column, Section } from "bloomer";

import UsersSkillGraph from "./queries/user-skill-graph";
import AddNewUser from "./mutations/add-user-skill";

export class SkillGraph extends Component {
  render() {
    return (
      <Section>
        <Container>
          <Columns isCentered>
            <Column hasTextAlign="centered">
              <AddNewUser />
            </Column>
          </Columns>
        </Container>

        <Container>
          <Columns isCentered>
            <Column hasTextAlign="centered">
              <UsersSkillGraph />
            </Column>
          </Columns>
        </Container>
      </Section>
    );
  }
}

// export const SkillGraphWithQuery = graphql(ALL_USERS_QUERY, {
//   name: "allUsersQuery",
//   options: {
//     fetchPolicy: "network-only",
//     options: { pollInterval: 5000 }
//   }
// })(SkillGraph);

export default SkillGraph;
