"use client";
import Input from "@/components/Input";

import Link from "next/link";
import React, { useState } from "react";
import { Lock, PersonStanding, User } from "lucide-react";
const page = () => {
 const [loginData, setLoginData] = useState({
  username: "",
  password: "",
 });
 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  setLoginData((prevData) => ({
   ...prevData,
   [name]: value,
  }));
 };
 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log(loginData);
 };
 return (
  <div>
   <div className="h-screen flex justify-center items-center">
    <div className="flex rounded-lg overflow-hidden z-50 bg-gray-300">
     <div className="w-full bg-gray-100 min-w-80 sm:min-w-96 flex items-center justify-center">
      <div className="max-w-md w-full p-6">
       <h1 className="text-3xl font-semibold mb-6 text-black text-center">login </h1>
       <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
        Join to keep track of your expenses
       </h1>
       <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
         label="Username"
         id="username"
         name="username"
         value={loginData.username}
         onChange={handleChange}
         icon={PersonStanding}
        />
        <Input
         label="Password"
         id="password"
         name="password"
         type="password" // You can specify input type like "password" here
         value={loginData.password}
         onChange={handleChange}
         icon={Lock}
        />

        <div>
         <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded-md"
          // disabled={loading}
         >
          {/* {loading ? "Loading..." : "Sign Up"} */}
          Login
         </button>
        </div>
       </form>
       <div className="mt-4 text-sm text-gray-600 text-center">
        <p>
         don't have an account ?
         <Link href="/signup" className="text-black hover:underline">
          signup
         </Link>
        </p>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default page;
