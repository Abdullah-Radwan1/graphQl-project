import { transactions } from "../dummy/data.js";
import TransactionModel from "../models/transactionModel.js";

export const transactionsResolver = {
 Query: {
  Alltransactions: async (_, _, context) => {
   try {
    const authenticated = context.getUser();
    if (!authenticated) {
     throw new Error("unauthorized");
    }
    const userId = await context.getUser()._id;
    const transactions = await TransactionModel.find({ userId });
    return transactions;
   } catch (error) {
    console.error("Error getting transactions:", error);
    throw new Error("Error getting transactions");
   }
  },
  transaction: async (_, args, context) => {
   try {
    const authenticated = context.getUser();
    if (!authenticated) {
     throw new Error("unauthorized");
    }

    const transaction = TransactionModel.findById(args.transactionId);
    return transaction;
   } catch (error) {
    console.error("Error getting transaction:", error);
    throw new Error("Error getting transaction");
   }
  },
 },
 Mutation: {
  createTransaction: async (_, { input }, context) => {
   try {
    const newTransaction = new TransactionModel({
     ...input,
     userId: context.getUser._id,
    });
    await newTransaction.save();
    return newTransaction;
   } catch (error) {
    console.error("Error getting transaction:", error);
    throw new Error("Error getting transaction");
   }
  },
 },
};

export default transactionsResolver;
