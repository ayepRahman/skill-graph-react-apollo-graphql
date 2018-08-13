import React, { Component } from "react";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import autoBind from "react-autobind";

export class UserSkillGraph extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      skillSets: []
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
        this.setState({
          skillSets: response.data.getUserSkillSets
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return <div />;
  }
}

export default withApollo(UserSkillGraph);
