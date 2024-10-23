import { users } from "../dummy/data.js";
import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
const userResolver = {
 Query: {
  authUser: async (_, __, context) => {
   try {
    const user = await context.getUser();
    return user;
   } catch (error) {
    console.error("Error in authUser: ", err);
    throw new Error("Internal server error");
   }
  },
  user: async (_, { userId }) => {
   try {
    return await UserModel.findOne({ userId });
   } catch (error) {
    console.error("Error in user query:", error);
    throw new Error(error.message || "Error getting user");
   }
  },
 },
 Mutation: {
  signUp: async (_, { input }, context) => {
   try {
    const { username, name, password, gender } = input;
    if (!username || !name || !password || !gender) {
     throw new Error("All fields are required");
    }
    const userExists = await UserModel.findOne({ username });
    if (userExists) {
     throw new Error("user already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const newUser = new UserModel({
     username,
     name,
     password: hashedPassword,
     gender,
     profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    await newUser.save();
    await context.login(newUser);
    return newUser;
   } catch (error) {
    console.error("Error in signUp: ", error);
    throw new Error(error.message || "Internal server error");
   }
  },
  login: async (_, { input }, context) => {
   try {
    const { username, password } = input;
    if (!username || !password) throw new Error("All fields are required");
    const { user } = await context.authenticate("graphql-local", {
     username,
     password,
    });

    await context.login(user);
    return user;
   } catch (err) {
    console.error("Error in login:", err);
    throw new Error(err.message || "Internal server error");
   }
  },
  logout: async (_, __, context) => {
   try {
    await context.logout();
    await context.req.session.destroy((error) => {
     throw new error("error loging out");
    });
    context.res.clearCookies("connect.sid");
    return { message: "Logged out successfully" };
   } catch (error) {
    console.error("Error in logout:", error);
    throw new Error(error.message || "Internal server error");
   }
  },
 },
};
export default userResolver;
