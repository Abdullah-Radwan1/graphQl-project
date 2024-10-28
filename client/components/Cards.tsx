import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_TRANSACTIONS } from "@/graphql/queries/transactionQuery";
import { transactions } from "@/types/transactionsType";

const Cards = () => {
 const { data } = useQuery(GET_TRANSACTIONS);
 console.log(data);
 return (
  <div className="w-full px-10 min-h-[40vh]">
   <p className="text-5xl font-bold text-center my-10">History</p>
   <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
    {data &&
     data.transactions.map((trans: transactions) => {
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
  </div>
 );
};
export default Cards;
