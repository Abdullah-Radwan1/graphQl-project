"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import Cards from "@/components/Cards";
import TransactionForm from "@/components/transactionForm";

import { LogOut } from "lucide-react";
import { LOGOUT } from "@/graphql/mutations/userMut";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TRANSACTION_STATISTICS } from "@/graphql/queries/transactionQuery";
import { useEffect, useState } from "react";
import { ChartData, stat } from "@/types/transactionsType";
import { useRouter } from "next/navigation";
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/userQuery";
import Cookies from "js-cookie";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
  const isLoggedIn = Cookies.get("isLoggedIn");
  const {
    data: authuser,
    error,
    loading: authloading,
  } = useQuery(GET_AUTHENTICATED_USER);
  const router = useRouter();
  console.log(authuser);
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [authuser, error, authloading, router]);
  const [logoutFunc, { loading, client }] = useMutation(LOGOUT);

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "$",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        borderRadius: 30,
        spacing: 10,
        cutout: 130,
      },
    ],
  });

  const { data, loading: dataloading } = useQuery(GET_TRANSACTION_STATISTICS);

  const handleLogout = async () => {
    try {
      await logoutFunc();
      client.clearStore();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    if (data?.transactionStats) {
      const categories = data.transactionStats.map(
        (stat: stat) => stat.category
      );
      const totalAmounts = data.transactionStats.map(
        (stat: stat) => stat.totalAmount
      );

      const backgroundColors: string[] = [];

      categories.forEach((category: string) => {
        if (category === "saving") {
          backgroundColors.push("#7CFC00");
        } else if (category === "expense") {
          backgroundColors.push("royalblue");
        } else if (category === "investment") {
          backgroundColors.push("rgba(54, 162, 235, 0.2)");
        }
      });

      setChartData((prev) => ({
        labels: categories,
        datasets: [
          {
            ...prev.datasets[0],
            data: totalAmounts,
            backgroundColor: backgroundColors,
            borderRadius: 0,
            spacing: 10,
            cutout: 130,
          },
        ],
      }));
    }
  }, [data]);

  return (
    <>
      <div className="mt-8 flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
        <div className="flex items-center">
          <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 ">
            welcome to Trans.com
          </p>

          {!loading && (
            <LogOut
              className="mx-2 w-5 h-5 cursor-pointer"
              onClick={handleLogout}
            />
          )}
          {loading && (
            <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin"></div>
          )}
        </div>

        <div className="flex flex-wrap w-full justify-center items-center gap-6">
          <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px] flex items-center justify-center">
            {dataloading ? (
              <h1>
                {" "}
                <div className="my-24 min-h-[80vh] flex justify-center items-center gap-4">
                  <div className="border-t-8  border-gray-500 rounded-full w-44 h-44 animate-spin m-auto"></div>
                </div>
              </h1>
            ) : data?.transactionStats && data.transactionStats.length > 0 ? (
              <Doughnut data={chartData} />
            ) : (
              <h1 className="text-4xl text-center w-64">
                Fell free to Add a new Transaction
              </h1>
            )}
          </div>
          <TransactionForm />
        </div>

        <Cards />
      </div>
    </>
  );
};
export default HomePage;
