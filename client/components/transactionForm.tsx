import React, { FormEvent } from "react";

interface TransactionData {
 description: string;
 paymentType: string;
 category: string;
 amount: number;
 location: string;
 date: string;
}

const TransactionForm: React.FC = () => {
 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);

  const transactionData: TransactionData = {
   description: formData.get("description") as string,
   paymentType: formData.get("paymentType") as string,
   category: formData.get("category") as string,
   amount: parseInt(formData.get("amount") as string),
   location: formData.get("location") as string,
   date: formData.get("date") as string,
  };

  console.log("transactionData", transactionData);
  // You can now send transactionData to an API or process it as needed.
 };

 return (
  <form
   className="w-full max-w-lg flex flex-col gap-5 px-3"
   onSubmit={handleSubmit}
  >
   {/* TRANSACTION */}
   <div className="flex flex-wrap">
    <div className="w-full">
     <label
      className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
      htmlFor="description"
     >
      Transaction
     </label>
     <input
      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      id="description"
      name="description"
      type="text"
      required
      placeholder="Rent, Groceries, Salary, etc."
     />
    </div>
   </div>
   {/* PAYMENT TYPE */}
   <div className="flex flex-wrap gap-3">
    <div className="w-full flex-1 mb-6 md:mb-0">
     <label
      className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
      htmlFor="paymentType"
     >
      Payment Type
     </label>
     <div className="relative">
      <select
       className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
       id="paymentType"
       name="paymentType"
      >
       <option value="card">Card</option>
       <option value="cash">Cash</option>
      </select>
     </div>
    </div>

    {/* CATEGORY */}
    <div className="w-full flex-1 mb-6 md:mb-0">
     <label
      className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
      htmlFor="category"
     >
      Category
     </label>
     <div className="relative">
      <select
       className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
       id="category"
       name="category"
      >
       <option value="saving">Saving</option>
       <option value="expense">Expense</option>
       <option value="investment">Investment</option>
      </select>
     </div>
    </div>

    {/* AMOUNT */}
    <div className="w-full flex-1 mb-6 md:mb-0">
     <label
      className="block uppercase text-white text-xs font-bold mb-2"
      htmlFor="amount"
     >
      Amount($)
     </label>
     <input
      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      id="amount"
      name="amount"
      type="number"
      placeholder="150"
      required
     />
    </div>
   </div>

   {/* LOCATION */}
   <div className="flex flex-wrap gap-3">
    <div className="w-full flex-1 mb-6 md:mb-0">
     <label
      className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
      htmlFor="location"
     >
      Location
     </label>
     <input
      className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
      id="location"
      name="location"
      type="text"
      placeholder="New York"
      required
     />
    </div>

    {/* DATE */}
    <div className="w-full flex-1">
     <label className=" text-white text-xs font-bold mb-2" htmlFor="date">
      Date
     </label>
     <input
      type="date"
      name="date"
      id="date"
      className="w-full bg-gray-200 text-gray-700 border rounded py-[11px] px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
      required
     />
    </div>
   </div>

   {/* SUBMIT BUTTON */}
   <button
    className="text-white font-bold w-full rounded px-4 py-2 bg-primary  text-[var(--priamry)]"
    type="submit"
   >
    Add Transaction
   </button>
  </form>
 );
};

export default TransactionForm;