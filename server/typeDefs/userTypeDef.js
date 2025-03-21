const userTypeDef = `#graphql
  type User {
    _id: ID!
    username: String!
    name: String!
    profilePicture: String
    gender: String!
    transactions: [Transaction!]
  }

  type Query {
    authUser: User
    user(userId: ID!): User
    users: [User!]!  # Add this line to define the users query
  }




  type Mutation {
    signUp(input: SignupInput!): User
    login(input: LoginInput!): User
    logout: LogoutResponse
  }

  input SignupInput {
    username: String!
    name: String!
    password: String!
    gender: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type LogoutResponse {
    message: String!
  }
`;

export default userTypeDef;
