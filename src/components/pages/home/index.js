import React, { Component } from "react";
import { Container, Columns, Column, Section, Title, Subtitle } from "bloomer";
// import { Modal, ModalBackground, ModalCard, ModalCardBody, ModalCardFooter } from 'bloomer';
// import { Button } from 'bloomer';
// import autoBind from 'react-autobind';

import SkillGraph from "components/features/users";

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
                </Subtitle>
              </Column>
            </Columns>
          </Container>
        </Section>
        <SkillGraph />
      </div>
    );
  }
}

export default Home;
