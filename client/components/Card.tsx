import { MapPin } from "lucide-react"; // FaLocationDot equivalent
import { FileText } from "lucide-react"; // BsCardText equivalent
import { CreditCard } from "lucide-react"; // MdOutlinePayments equivalent
import { Coins } from "lucide-react"; // FaSackDollar equivalent
import { Trash } from "lucide-react"; // FaTrash equivalent
import { Edit3 } from "lucide-react"; // HiPencilAlt equivalent
import Link from "next/link";

const Card = () => {
 return (
  <div className={`rounded-md p-4 bg-gray-200 text-black `}>
   <div className="flex flex-col gap-3">
    <div className="flex flex-row items-center justify-between">
     <h2 className="text-lg font-bold ">Saving</h2>
     <div className="flex items-center gap-2">
      <Trash className={"text-orange-500"} />
      <Link href={`/transaction/123`}>
       <Edit3 className="text-primary" size={20} />
      </Link>
     </div>
    </div>
    <p className="flex items-center gap-1">
     <FileText />
     Description: Salary
    </p>
    <p className="flex items-center gap-1">
     <CreditCard />
     Payment Type: Cash
    </p>
    <p className="flex items-center gap-1">
     <Coins />
     Amount: $150
    </p>
    <p className="flex items-center gap-1">
     <MapPin />
     Location: New York
    </p>
    <div className="flex justify-between items-center">
     <p className="text-xs text-black font-bold">21 Sep, 2001</p>
    </div>
   </div>
  </div>
 );
};

export default Card;
