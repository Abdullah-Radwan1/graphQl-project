import { MapPin } from "lucide-react"; // FaLocationDot equivalent
import { FileText } from "lucide-react"; // BsCardText equivalent
import { CreditCard } from "lucide-react"; // MdOutlinePayments equivalent
import { Coins } from "lucide-react"; // FaSackDollar equivalent
import { Trash } from "lucide-react"; // FaTrash equivalent
import { Edit3 } from "lucide-react"; // HiPencilAlt equivalent

import Link from "next/link";

const categoryColorMap = {
 saving: "from-green-700 to-green-400",
 expense: "from-pink-800 to-pink-600",
 investment: "from-blue-700 to-blue-400",
 // Add more categories and corresponding color classes as needed
};

const Card = () => {
 return (
  <div className={`rounded-md p-4 bg-gradient-to-br `}>
   <div className="flex flex-col gap-3">
    <div className="flex flex-row items-center justify-between">
     <h2 className="text-lg font-bold text-white">Saving</h2>
     <div className="flex items-center gap-2">
      <Trash className={"cursor-pointer"} />
      <Link href={`/transaction/123`}>
       <Edit3 className="cursor-pointer" size={20} />
      </Link>
     </div>
    </div>
    <p className="text-white flex items-center gap-1">
     <FileText />
     Description: Salary
    </p>
    <p className="text-white flex items-center gap-1">
     <CreditCard />
     Payment Type: Cash
    </p>
    <p className="text-white flex items-center gap-1">
     <Coins />
     Amount: $150
    </p>
    <p className="text-white flex items-center gap-1">
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
