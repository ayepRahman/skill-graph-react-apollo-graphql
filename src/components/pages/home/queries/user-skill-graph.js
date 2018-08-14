import React, { Component } from "react";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import autoBind from "react-autobind";

import RadarChart from "components/common/chart/radar";
import { forEach } from "async";

export class UserSkillGraph extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      skillName: [],
      skillLevel: []
    };
  }

  componentDidMount = async () => {
    const { client } = this.props;
    try {
      const response = await client.query({
        query: gql`
          query getUserSkillSets {
            getUserSkillSets {
              skillName
              skillLevel
            }
          }
        `
      });

      if (response.error) {
        console.log(response.error);
      } else {
        this.convertSkillSetsToData(response.data.getUserSkillSets);
      }
    } catch (error) {
      console.log(error);
    }
  };

  convertSkillSetsToData(skillSets) {
    let skillNameArray = ["No Skill"];
    let skillLevelArray = [0];

    skillSets.forEach(data => {
      skillNameArray.push(data.skillName);
      skillLevelArray.push(data.skillLevel);
    });

    this.setState({
      skillName: skillNameArray,
      skillLevel: skillLevelArray
    });
  }

  render() {
    const { skillName, skillLevel } = this.state;

    if (!skillName && !skillLevel) return null;

    return <RadarChart skillName={skillName} skillLevel={skillLevel} />;
  }
}

export default withApollo(UserSkillGraph);
