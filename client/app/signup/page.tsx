"use client";
import Input from "@/components/Input";
import RadioButton from "@/components/radio";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Lock, PersonStanding, User } from "lucide-react";
import { SIGN_UP } from "@/graphql/mutations/userMut";
import { useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/userQuery";

const Page = () => {
 const router = useRouter();
 const {
  data: authuser,
  error,
  loading: authloading,
 } = useQuery(GET_AUTHENTICATED_USER);

 useEffect(() => {
  if (!authloading && authuser) {
   router.push("/");
  }
 }, [authuser, error, authloading, router]);
 const [signUpFunc, { loading }] = useMutation(SIGN_UP);

 const [signUpData, setSignUpData] = useState({
  name: "",
  username: "",
  password: "",
  gender: "",
 });
 console.log(signUpData.name);
 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value, type } = e.target;
  if (type === "radio") {
   setSignUpData((prevData) => ({
    ...prevData,
    gender: value,
   }));
  } else {
   setSignUpData((prevData) => ({
    ...prevData,
    [name]: value,
   }));
  }
 };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
   await signUpFunc({
    variables: { input: signUpData },
   });
   toast.success("Signup successful!");
   router.push("/");
  } catch (err: any) {
   toast.error(`Signup failed: ${err.message || "An error occurred"}`);
   console.error("Signup error:", err);
  }
 };

 return (
  <div>
   <div className="h-screen flex justify-center items-center">
    <div className="flex rounded-lg overflow-hidden z-50 bg-gray-300">
     <div className="w-full bg-gray-100 min-w-80 sm:min-w-96 flex items-center justify-center">
      <div className="max-w-md w-full p-6">
       <h1 className="text-3xl font-semibold mb-6 text-black text-center">
        Sign Up
       </h1>
       <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
        Join to keep track of your expenses
       </h1>
       <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
         label="Full Name"
         id="name"
         name="name"
         value={signUpData.name}
         onChange={handleChange}
         icon={User}
        />
        <Input
         label="Username"
         id="username"
         name="username"
         value={signUpData.username}
         onChange={handleChange}
         icon={PersonStanding}
        />
        <Input
         label="Password"
         id="password"
         name="password"
         type="password"
         value={signUpData.password}
         onChange={handleChange}
         icon={Lock}
        />
        <div className="flex gap-10">
         <RadioButton
          id="male"
          label="Male"
          name="gender"
          value="male"
          onChange={handleChange}
          checked={signUpData.gender === "male"}
         />
         <RadioButton
          id="female"
          label="Female"
          name="gender"
          value="female"
          onChange={handleChange}
          checked={signUpData.gender === "female"}
         />
        </div>

        <div>
         <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded-md"
          disabled={loading}
         >
          {loading ? "Loading..." : "Sign Up"}
         </button>
        </div>
       </form>
       <div className="mt-4 text-sm text-gray-600 text-center">
        <p>
         Already have an account?{" "}
         <Link href="/login" className="text-black hover:underline">
          Login here
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

export default Page;
