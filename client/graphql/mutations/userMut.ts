import { gql } from "@apollo/client";

export const SIGN_UP = gql`
 mutation signUp($input: SignupInput!) {
  signUp(input: $input) {
   _id
   name
   username
   gender
   password
  }
 }
`;
export const LOGOUT = gql`
 mutation logout {
  logout {
   message
  }
 }
`;
export const LOGIN = gql`
 mutation Login($input: LoginInput!) {
  login(input: $input) {
   _id
   name
   username
  }
 }
`;
