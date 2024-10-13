import { mergeResolvers } from "@graphql-tools/merge";

import { userResolver } from "./userReslover.js";
import { transactionsResolver } from "./transactionsREsolver.js";

const mergedResolvers = mergeResolvers([userResolver, transactionsResolver]);
export default mergedResolvers;
