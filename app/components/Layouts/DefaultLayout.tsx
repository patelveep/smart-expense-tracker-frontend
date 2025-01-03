"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../Sidebar";
// import Header from "@/components/Header";
import Cookies from "js-cookie";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <div className="relative flex flex-1 flex-col lg:ml-72.5">
         
          <main>
            <div style={{
              marginLeft:'220px'
            }}>
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
