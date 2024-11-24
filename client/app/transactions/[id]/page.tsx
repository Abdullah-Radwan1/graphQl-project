"use client";
import TransactionFormSkeleton from "@/components/skeleton";
import { UPDATE_TRANSACTION } from "@/graphql/mutations/transactionMut";
import { GET_TRANSACTION } from "@/graphql/queries/transactionQuery";
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/userQuery";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const TransactionPage = () => {
 const { id } = useParams();

 const {
  data: authuser,
  error,
  loading: authloading,
 } = useQuery(GET_AUTHENTICATED_USER);
 const router = useRouter();
 console.log(authuser);
 useEffect(() => {
  if (error) {
   router.push("/login");
  }
 }, [authuser, error, authloading, router]);

 const [updateTransactionFunc, { loading, data }] = useMutation(
  UPDATE_TRANSACTION,
  {
   refetchQueries: ["GetTransactions", "TransactionStats"],
  }
 );
 const { loading: transLoading, data: transData } = useQuery(GET_TRANSACTION, {
  variables: { id },
 });

 console.log(transData);

 const [formData, setFormData] = useState({
  description: data?.transaction?.description || "",
  paymentType: data?.transaction?.paymentType || "",
  category: data?.transaction?.category || "",
  amount: data?.transaction?.amount || "",
  location: data?.transaction?.location || "",
  date: data?.transaction?.date || "",
 });

 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  console.log(formData);
  console.log(data);
  const amount = parseFloat(formData.amount); // convert amount to number bc by default it is string

  e.preventDefault();
  try {
   await updateTransactionFunc({
    variables: { input: { ...formData, transactionId: id, amount } },
   });
   toast.success("transaction updated successfully!");
   router.push("/");
  } catch (error: any) {
   toast.error(error.message);
  }
 };

 const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
 ) => {
  const { name, value } = e.target;
  setFormData((prevFormData) => ({
   ...prevFormData,
   [name]: value,
  }));
 };
 useEffect(() => {
  if (transData) {
   setFormData({
    description: transData?.transaction?.description || "",
    paymentType: transData?.transaction?.paymentType || "",
    category: transData?.transaction?.category || "",
    amount: transData?.transaction?.amount || "",
    location: transData?.transaction?.location || "",
    date: transData?.transaction?.date || "",
   });
  }
 }, [transData]);
 useEffect(() => {
  if (authloading) return; // Don't run while loading
  if (!authuser || error) {
   router.push("/login");
  }
 }, [authuser, error, authloading, router]);
 // if (loading) return <TransactionFormSkeleton />;
 if (transLoading) return <TransactionFormSkeleton />;
 return (
  <div className="mt-[3rem] h-screen max-w-4xl mx-auto flex flex-col items-center">
   <p className=" mb-12 md:text-4xl text-2xl lg:text-4xl font-bold text-center relative  mr-4 text-white">
    Update transaction
   </p>
   <form
    className="w-full max-w-lg flex flex-col gap-5 px-3 "
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
       className=" block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
       id="description"
       name="description"
       type="text"
       placeholder="Rent, Groceries, Salary, etc."
       value={formData.description}
       onChange={handleInputChange}
       required={true}
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
        className=" appearance-none w-full bg-gray-200   text-gray-700 py-3 px-4 x rounded  "
        id="paymentType"
        name="paymentType"
        onChange={handleInputChange}
        defaultValue={formData.paymentType}
       >
        <option value={"card"}>Card</option>
        <option value={"cash"}>Cash</option>
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
        className="block appearance-none w-full bg-gray-200 border  text-gray-700 py-3 px-4 pr-8 rounded "
        id="category"
        name="category"
        onChange={handleInputChange}
        defaultValue={formData.category}
        required={true}
       >
        <option value={"saving"}>Saving</option>
        <option value={"expense"}>Expense</option>
        <option value={"investment"}>Investment</option>
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
       className=" block w-full bg-gray-200 text-gray-700   rounded py-3 px-4 "
       id="amount"
       name="amount"
       type="number"
       placeholder="150"
       required
       value={formData.amount}
       onChange={handleInputChange}
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
       className="appearance-none  w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 "
       id="location"
       name="location"
       type="text"
       placeholder="New York"
       value={formData.location}
       onChange={handleInputChange}
       required
      />
     </div>

     {/* DATE */}
     <div className="w-full flex-1">
      <label
       className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
       htmlFor="date"
      >
       Date
      </label>
      <input
       type="date"
       name="date"
       id="date"
       className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-[11px] px-4 mb-3 leading-tight focus:outline-none
						 focus:bg-white"
       placeholder="Select date"
       value={formData.date}
       onChange={handleInputChange}
      />
     </div>
    </div>
    {/* SUBMIT BUTTON */}
    <button
     className="text-white font-bold w-full rounded px-4 py-2 bg-primary
         "
     type="submit"
    >
     Update Transaction
    </button>
   </form>
  </div>
 );
};
export default TransactionPage;
