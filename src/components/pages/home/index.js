import React, { Component } from "react";
import { Container, Columns, Column, Section, Title, Subtitle } from "bloomer";

import UserDetails from "./queries/user-details";
import UsersSkillGraph from "./queries/user-skills";
import AddUserSkillSetsButton from "./mutations/add-user-skill-sets-button";

export class Home extends Component {
  render() {
    return (
      <Section>
        <Container>
          <Columns isCentered>
            <Column isSize="full" hasTextAlign="centered">
              <Title hasTextColor="primary" isSize={1}>
                Profile Page
              </Title>
              <Subtitle>Please add your skill to showcase</Subtitle>
            </Column>
          </Columns>
          <Columns isCentered>
            <Column isSize="full" hasTextAlign="centered">
              <AddUserSkillSetsButton />
            </Column>
          </Columns>
        </Container>
      </Section>
    );
  }
}

export default Home;
