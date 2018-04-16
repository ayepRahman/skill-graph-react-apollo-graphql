// import React, { Component } from "react";
// import { graphql, Mutation } from "react-apollo";
// import gql from "graphql-tag";
// import autoBind from "react-autobind";

// import { Container, Columns, Column, Section } from "bloomer";
// import {
//   Modal,
//   ModalBackground,
//   ModalCard,
//   ModalCardBody,
//   ModalCardFooter
// } from "bloomer";
// import { Field, Control, Label, Input } from "bloomer";
// import { Button } from "bloomer";

// import { SkillGraphWithQuery } from "components/features/users";

// export class AddNewUser extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       isOpen: false,
//       name: "",
//       skill: "",
//       skill_level: ""
//     };

//     autoBind(this);
//   }

//   toggleModal() {
//     this.setState({
//       isOpen: !this.state.isOpen
//     });
//   }

//   handleChange(event) {
//     this.setState({
//       [event.target.name]: event.target.value
//     });
//   }

//   handleSubmit = async () => {
//     const { addNewUserMutation } = this.props;
//     const { name } = this.state;

//     alert("trigerred");

//     await addNewUserMutation({
//       variables: { name },
//       refetchQueries: [{ query: SkillGraphWithQuery }]
//     });

//     this.setState({
//       isOpen: !this.state.isOpen
//     });
//   };

//   renderForm() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <Field>
//           <Label isPulled="left">Name</Label>
//           <Control>
//             <Input
//               name="name"
//               type="text"
//               placeholder="Username"
//               value={this.state.name}
//               onChange={this.handleChange}
//               required
//             />
//           </Control>
//         </Field>

//         {
//           //   <Field>
//           //   <Label isPulled="left">Skill</Label>
//           //   <Control>
//           //     <Input
//           //       name="skill"
//           //       type="text"
//           //       placeholder="Skill"
//           //       value={this.state.skill}
//           //       onChange={this.handleChange}
//           //       required
//           //     />
//           //   </Control>
//           // </Field>
//         }
//       </form>
//     );
//   }

//   renderModal() {
//     return (
//       <Modal isActive={this.state.isOpen}>
//         <ModalBackground />
//         <ModalCard>
//           <ModalCardBody>{this.renderForm()}</ModalCardBody>
//           <ModalCardFooter>
//             <Button onClick={this.handleSubmit} isColor="primary" isOutlined>
//               Save
//             </Button>
//             <Button onClick={this.toggleModal} isColor="danger" isOutlined>
//               Cancel
//             </Button>
//           </ModalCardFooter>
//         </ModalCard>
//       </Modal>
//     );
//   }

//   render() {
//     return (
//       <Section>
//         <Container>
//           <Columns isCentered>
//             <Column hasTextAlign="centered">
//               <Button onClick={() => this.toggleModal()} isColor="primary">
//                 Add Skill
//               </Button>
//               {this.renderModal()}
//             </Column>
//           </Columns>
//         </Container>
//       </Section>
//     );
//   }
// }

// const ADD_NEW_USER = gql`
//   mutation addNewUser($name: String!) {
//     addNewUser(name: $name) {
//       id
//       name
//     }
//   }
// `;

// const AddNewUserWithMutation = graphql(ADD_NEW_USER, {
//   name: "addNewUserMutation"
// })(AddNewUser);

// export default AddNewUserWithMutation;
