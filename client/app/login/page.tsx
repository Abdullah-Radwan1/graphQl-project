"use client";
import Input from "@/components/Input";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Lock, PersonStanding } from "lucide-react";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN } from "@/graphql/mutations/userMut";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/userQuery";
import Cookies from "js-cookie";

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

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [loginFunc, { data, loading }] = useMutation(LOGIN);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginFunc({
        variables: { input: loginData },
      });
      toast.success("Logged in successfully");

      // Set the "isLoggedIn" cookie with a value of 1
      Cookies.set("isLoggedIn", "1", { expires: 7 }); // Expires in 7 days

      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <div>
      <div className="h-screen flex justify-center items-center">
        <div className="flex rounded-lg overflow-hidden z-50 bg-gray-300">
          <div className="w-full bg-gray-100 min-w-80 sm:min-w-96 flex items-center justify-center">
            <div className="max-w-md w-full p-6">
              <h1 className="text-3xl font-semibold mb-6 text-black text-center">
                Login
              </h1>
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
                  type="password"
                  value={loginData.password}
                  onChange={handleChange}
                  icon={Lock}
                />
                <div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white p-2 rounded-md"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>
              <div className="mt-4 text-sm text-gray-600 text-center">
                <p>
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-black hover:underline">
                    Sign up
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
