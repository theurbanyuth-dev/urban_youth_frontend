import React from "react";

//internal import

import { getOrderCustomer } from "@services/OrderServices";
import { getStoreCustomizationSetting } from "@services/SettingServices";

import {
  ShoppingBag,
  Star,
  User,
  Edit,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react";
import { Button } from "@components/ui/button";
import LogoutButton2 from "@components/user-dashboard/LogoutButton2";

const menuItems = [
  { title: "Orders", icon: ShoppingBag, href: "/user/my-orders" },
  { title: "My Reviews", icon: Star, href: "/user/my-reviews" },
  { title: "Update Profile", icon: Edit, href: "/user/update-profile" },
];

const Dashboard = async ({ searchParams }) => {
  const { storeCustomizationSetting } = await getStoreCustomizationSetting();

  const { page } = await searchParams;

  const dashboard = storeCustomizationSetting?.dashboard;

  const { data, error } = await getOrderCustomer({
    page: Number(page || 1),
    limit: 10, 
  });

  return (
    <>
      <div className="overflow-hidden  ">
        <section className="  mx-auto p-2 mb-10">
          <div className="grid grid-cols-3 gap-4">
            {menuItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <Link
                  href={item.href}
                  key={index}
                  className="flex flex-col items-center justify-center p-4 px-1 border rounded-md  hover:shadow-md cursor-pointer transition"
                >
                  <Icon className="w-8 h-8 mb-2 text-blue-600" />
                  <span className="text-sm font-medium">{item.title}</span>
                </Link>
              );
            })}
          </div>

          <LogoutButton2 />
        </section>
      </div>
    </>
  );
};

export default Dashboard;
