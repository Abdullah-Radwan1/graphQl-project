import { gql } from "@apollo/client";

export const GET_AUTHENTICATED_USER = gql`
 query GetAuthenticatedUser {
  authUser {
   _id
   username
   name
   profilePicture
  }
 }
`;

export const GET_USER_AND_TRANSACTIONS = gql`
 query GetUserAndTransations($userId: ID!) {
  user(userId: $userId) {
   _id
   name
   username
   # user Transactions (ralation)
   transactions {
    _id
    paymentType
    description
    category
    amount
    location
    date
   }
  }
 }
`;
