"use client";

import { Eye } from "lucide-react";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoBagHandle } from "react-icons/io5";

//internal import
import OrderHistory from "./OrderHistory";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";
import Pagination from "@components/pagination/Pagination";
import OrderDetailsDrawer from "@components/drawer/OrderDetailsDrawer";

const RecentOrder = ({ data, error, link, title }) => {
  const router = useRouter();
  const [orderData, setOrderData] = useState({});
  const { showingTranslateValue } = useUtilsFunction();
  const { setDrawerOpen } = useContext(SidebarContext);

  const handleChangePage = (page) => { 
    router.push(`?page=${page}`);
  };

  const handleOrderDetails = (order) => {
    setOrderData(order);
    setDrawerOpen(true);
  }; 

  return (
    <>
      {orderData && <OrderDetailsDrawer data={orderData} />}
      <div className="max-w-screen-2xl mx-auto">
        <div className="rounded-md">
          {error ? (
            <h2 className="text-xl text-center my-10 mx-auto w-11/12 text-red-400">
              {error}
            </h2>
          ) : data?.orders?.length === 0 ? (
            <div className="text-center">
              <span className="flex justify-center my-30 pt-16 text-emerald-500 font-semibold text-6xl">
                <IoBagHandle />
              </span>
              <h2 className="font-medium text-md my-4 text-gray-600">
                You Have no order Yet!
              </h2>
            </div>
          ) : (
            <div className="flex flex-col">
              <h3 className="text-lg font-medium mb-1">
                {showingTranslateValue(title)}
              </h3>
              <div className="my-4 mt-1 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="align-middle inline-block   min-w-full pb-2 sm:px-6 lg:px-8 rounded-md">
                  <div className="overflow-hidden border-b last:border-b-0 border-gray-100 rounded-md">
                    <div className="inline-block min-w-full py-2 align-middle   ">
                      <div className="overflow-hidden   sm:rounded-lg">
                        <div className="space-y-4 ">
                          {data?.orders?.map((order) => {
                            const content = (
                              <div className=" bg-[#f5f5f5] rounded-2xl mb-4 border  p-4 active:scale-[0.98] transition-all cursor-pointer">
                                <OrderHistory order={order} />
                              </div>
                            );

                            return link ? (
                              <Link
                                key={order?._id}
                                href={`/order/${order?._id}`}
                              >
                                {content}
                              </Link>
                            ) : (
                              <div
                                key={order?._id}
                                onClick={() => {
                                  handleOrderDetails(order);
                                  setDrawerOpen(true);
                                }}
                              >
                                {content}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    {data?.totalDoc > 10 && (
                      <Pagination
                        totalResults={data?.totalDoc}
                        resultsPerPage={10}
                        onChange={handleChangePage}
                        label="Product Page Navigation"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RecentOrder;
