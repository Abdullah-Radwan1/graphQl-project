import { transactions } from "../dummy/data.js";

export const transactionsResolver = {
 Query: {
  users: () => {
   return transactions;
  },
 },
 Mutation: {},
};
