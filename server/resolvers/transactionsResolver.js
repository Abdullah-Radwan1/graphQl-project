import TransactionModel from "../models/transactionModel.js";
import UserModel from "../models/userModel.js";

const transactionsResolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        const authenticated = await context.getUser(); // Ensure await
        console.log("Authenticated User:", authenticated); // Debugging
        if (!authenticated) {
          throw new Error("unauthorized");
        }
        const userId = authenticated._id; // Use authenticated user directly
        const transactions = await TransactionModel.find({ userId });
        return transactions;
      } catch (error) {
        console.error("Error getting transactions:", error);
        throw new Error("Error getting transactions");
      }
    },
    transaction: async (_, { transactionId }, context) => {
      try {
        const authenticated = await context.getUser(); // Ensure await
        if (!authenticated) {
          throw new Error("unauthorized");
        }
        const transaction = await TransactionModel.findById(transactionId); // Ensure await
        return transaction;
      } catch (error) {
        console.error("Error getting transaction:", error);
        throw new Error("Error getting transaction");
      }
    },
    transactionStats: async (_, __, context) => {
      try {
        const authenticated = await context.getUser(); // Ensure await
        if (!authenticated) throw new Error("Unauthorized");

        const userId = authenticated._id;
        const transactions = await TransactionModel.find({ userId });
        const categoryMap = {};

        transactions.forEach((transaction) => {
          if (!categoryMap[transaction.category]) {
            categoryMap[transaction.category] = 0;
          }
          categoryMap[transaction.category] += transaction.amount;
        });

        return Object.entries(categoryMap).map(([category, totalAmount]) => ({
          category,
          totalAmount,
        }));
      } catch (error) {
        console.error("Error getting transaction stats:", error);
        throw new Error("Error getting transaction stats");
      }
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const authenticated = await context.getUser(); // Ensure await
        if (!authenticated) throw new Error("Unauthorized");

        const newTransaction = new TransactionModel({
          ...input,
          userId: authenticated._id, // Use authenticated user directly
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
        const deletedTransaction = await TransactionModel.findByIdAndDelete(
          transactionId
        );
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
