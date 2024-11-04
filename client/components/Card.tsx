import { DELETE_TRANSACTION } from "@/graphql/mutations/transactionMut";
import { transactions } from "@/types/transactionsType";
import { useMutation } from "@apollo/client";
import {
 MapPin,
 FileText,
 CreditCard,
 Coins,
 Trash,
 Edit3,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const Card = ({
 _id,
 amount,
 category,
 description,
 location,
 paymentType,
}: transactions) => {
 const [deleteTransactionFunc, { loading }] = useMutation(DELETE_TRANSACTION, {
  refetchQueries: ["GetTransactions", "TransactionStats"],
 });

 const handlefunction = async () => {
  try {
   await deleteTransactionFunc({ variables: { transactionId: _id } });
   toast.success("Transaction was deleted successfully");
  } catch (error: any) {
   toast.error(error.message);
  }
 };

 return (
  <div className="rounded-md p-4 bg-gray-200 text-black">
   <div className="flex flex-col gap-3">
    <div className="flex flex-row items-center justify-between">
     <h2 className="text-lg font-bold ">{category}</h2>
     <div className="flex items-center gap-2">
      {loading ? (
       <div className="w-6 h-6 border-t-2 border-b-2 text-black text-lg rounded-full animate-spin"></div>
      ) : (
       <Trash
        onClick={handlefunction}
        className="text-orange-500 transition-transform duration-200 hover:scale-125"
       />
      )}
      <Link href={`transactions/${_id}`}>
       <Edit3 className="text-primary duration-200 hover:scale-125" size={20} />
      </Link>
     </div>
    </div>
    <p className="flex items-center gap-1">
     <FileText className="duration-200 hover:scale-110" />
     Description: {description}
    </p>
    <p className="flex items-center gap-1">
     <CreditCard className="transition-transform duration-200 hover:scale-110" />
     Payment Type: {paymentType}
    </p>
    <p className="flex items-center gap-1">
     <Coins className="transition-transform duration-200 hover:scale-110" />
     Amount: {amount}$
    </p>
    <p className="flex items-center gap-1">
     <MapPin className="transition-transform duration-200 hover:scale-110" />
     Location: {location}
    </p>
    <div className="flex justify-between items-center">
     <p className="text-xs text-black font-bold">21 Sep, 2024</p>
    </div>
   </div>
  </div>
 );
};

export default Card;
