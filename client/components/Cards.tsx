import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_TRANSACTIONS } from "@/graphql/queries/transactionQuery";
import { transactions } from "@/types/transactionsType";
import {
 GET_AUTHENTICATED_USER,
 GET_USER_AND_TRANSACTIONS,
} from "@/graphql/queries/userQuery";

const Cards = () => {
 const { data, loading } = useQuery(GET_TRANSACTIONS);
 const { data: AuthenticatedUserFunc } = useQuery(GET_AUTHENTICATED_USER);
 console.log("sss", AuthenticatedUserFunc?.authUser?._id);
 console.log("data", data);
 const { data: userAndTransFunc } = useQuery(GET_USER_AND_TRANSACTIONS, {
  variables: { userId: AuthenticatedUserFunc?.authUser?._id },
 });
 console.log(userAndTransFunc);
 return (
  <div className="w-full px-10 min-h-[40vh]">
   <p className="text-5xl font-bold text-center my-10">History</p>
   {loading ? (
    <h1>
     {" "}
     <div className="border-t-8  border-gray-500 rounded-full w-44 h-44 animate-spin m-auto"></div>
    </h1>
   ) : data?.transactions && data.transactions.length > 0 ? (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
     {data.transactions.map((trans: transactions) => {
      return (
       <Card
        _id={trans._id}
        amount={trans.amount}
        category={trans.category}
        description={trans.description}
        location={trans.location}
        paymentType={trans.paymentType}
        key={trans._id}
       />
      );
     })}
    </div>
   ) : (
    <h1 className="text-center text3x">no History was found</h1>
   )}
  </div>
 );
};
export default Cards;
