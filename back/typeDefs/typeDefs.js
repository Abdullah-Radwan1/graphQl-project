import { mergeTypeDefs } from "@graphql-tools/merge";
import { UserTypeDef } from "./userTypeDef.js";
import transactionTypeDef from "./transactionsTypeDefs.js";

const mergeDefs = mergeTypeDefs([UserTypeDef, transactionTypeDef]);
export default mergeDefs;
