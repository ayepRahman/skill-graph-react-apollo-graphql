import React, { Component } from "react";
import { Container, Columns, Column, Section, Title, Subtitle } from "bloomer";

import UserDetails from "./queries/user-details";
import UsersSkillGraph from "./queries/user-skills";
import AddUserSkill from "./mutations/add-user-skill";

export class Home extends Component {
  render() {
    return (
      <div>
        <Section>
          <Container>
            <Columns isCentered>
              <Column hasTextAlign="centered">
                <Title hasTextColor="primary" isSize={1}>
                  Skill Graph
                </Title>
                <Subtitle hasTextColor="primary">
                  <span aria-label="Rocket" role="img">
                    🚀
                  </span>
                  Most Best Skill Graph ever using Apollo,React,Graphql and
                  MongoDB
                  <span aria-label="Rocket" role="img">
                    🚀
                  </span>
                  <UserDetails />
                </Subtitle>
              </Column>
            </Columns>
          </Container>
        </Section>

        {
          //TODO: if user added their skill show their skill radar chart instead of the add skill button
        }

        <Section>
          <Container>
            <Columns isCentered>
              <Column hasTextAlign="centered">
                <AddUserSkill />
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
      </div>
    );
  }
}

export default Home;
