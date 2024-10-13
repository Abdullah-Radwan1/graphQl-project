import { users } from "../dummy/data.js";

export const userResolver = {
 Query: {
  users: () => {
   return users;
  },
 },
 Mutation: {},
};
