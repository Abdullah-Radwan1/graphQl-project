import TransactionModel from "../models/transactionModel.js";
import UserModel from "../models/userModel.js";

const transactionsResolver = {
  Query: {
    transactions: async (_, __, context) => {
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
    transactionStats: async (_, __, context) => {
      if (!context.getUser()) throw new Error("Unauthorized");

      const userId = context.getUser()._id;
      const transactions = await TransactionModel.find({ userId });
      const categoryMap = {};
      // للتذكير
      // const transactions = [
      // 	{ category: "expense", amount: 50 },
      // 	{ category: "expense", amount: 75 },
      // 	{ category: "investment", amount: 100 },
      // 	{ category: "saving", amount: 30 },
      // 	{ category: "saving", amount: 20 }
      // ];

      transactions.forEach((transaction) => {
        if (!categoryMap[transaction.category]) {
          categoryMap[transaction.category] = 0;
        }
        categoryMap[transaction.category] += transaction.amount;
      });

      // categoryMap = { expense: 125, investment: 100, saving: 50 }

      return Object.entries(categoryMap).map(([category, totalAmount]) => ({
        category,
        totalAmount,
      }));
      // return [ { category: "expense", totalAmount: 125 }, { category: "investment", totalAmount: 100 }, { category: "saving", totalAmount: 50 } ]
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const newTransaction = new TransactionModel({
          ...input,
          userId: context.getUser()._id,
        });
        await newTransaction.save();
        return newTransaction;
      } catch (error) {
        console.error("Error creating transaction:", error);
        throw new Error("Error creating transaction");
      }
    },

    updateTransaction: async (_, { input }) => {
      try {
        const updatedTransaction = await TransactionModel.findByIdAndUpdate(
          input.transactionId,
          input,
          { new: true }
        );

        return updatedTransaction;
      } catch (error) {
        console.error("Error updating transaction:", error);
        throw new Error("Error updating transaction");
      }
    },

    deleteTransaction: async (_, { transactionId }) => {
      try {
        const deletedTransaction =
          TransactionModel.findByIdAndDelete(transactionId);
        return deletedTransaction;
      } catch (error) {
        console.error("Error deleting transaction:", error);
        throw new Error("Error deleting transaction");
      }
    },
  },
  Transaction: {
    user: async (parent) => {
      try {
        // Use the userId from the parent transaction to fetch the user
        const user = await UserModel.findById(parent.userId);
        return user;
      } catch (error) {
        console.error(error);
        throw new Error(error.message || "Internal server error");
      }
    },
  },
};
export default transactionsResolver;
