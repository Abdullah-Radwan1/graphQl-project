import { mergeTypeDefs } from "@graphql-tools/merge";
import userTypeDef from "./userTypeDef.js";
import transactionTypeDef from "./transactionsTypeDefs.js";

const mergeDefs = mergeTypeDefs([userTypeDef, transactionTypeDef]);
export default mergeDefs;
