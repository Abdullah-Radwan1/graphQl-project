"use client";
import { DELETE_TRANSACTION } from "@/graphql/mutations/transactionMut";
import { transactions } from "@/types/transactionsType";
import { useMutation } from "@apollo/client";
import { MapPin } from "lucide-react"; // FaLocationDot equivalent
import { FileText } from "lucide-react"; // BsCardText equivalent
import { CreditCard } from "lucide-react"; // MdOutlinePayments equivalent
import { Coins } from "lucide-react"; // FaSackDollar equivalent
import { Trash } from "lucide-react"; // FaTrash equivalent
import { Edit3 } from "lucide-react"; // HiPencilAlt equivalent
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
 console.log(_id);
 const [deleteTransactionFunc, { loading }] = useMutation(DELETE_TRANSACTION, {
  refetchQueries: ["GetTransactions"],
 });
 const handlefunction = async () => {
  try {
   await deleteTransactionFunc({ variables: { transactionId: _id } });
   toast.success("transaction was deleted successfuly");
  } catch (error: any) {
   toast.error(error.message);
  }
 };
 return (
  <div className={`rounded-md p-4 bg-gray-200 text-black `}>
   <div className="flex flex-col gap-3">
    <div className="flex flex-row items-center justify-between">
     <h2 className="text-lg font-bold ">{category}</h2>
     <div className="flex items-center gap-2">
      {loading ? (
       <div className="w-6 h-6 border-t-2 border-b-2 !text-black text-lg rounded-full animate-spin"></div>
      ) : (
       <Trash onClick={handlefunction} className={"text-orange-500"} />
      )}

      <Link href={`transactions/${_id}`}>
       <Edit3 className="text-primary" size={20} />
      </Link>
     </div>
    </div>
    <p className="flex items-center gap-1">
     <FileText />
     Description: {description}
    </p>
    <p className="flex items-center gap-1">
     <CreditCard />
     Payment Type: {paymentType}
    </p>
    <p className="flex items-center gap-1">
     <Coins />
     Amount: {amount}$
    </p>
    <p className="flex items-center gap-1">
     <MapPin />
     Location: {location}
    </p>
    <div className="flex justify-between items-center">
     <p className="text-xs text-black font-bold">21 Sep, 2001</p>
    </div>
   </div>
  </div>
 );
};

export default Card;
