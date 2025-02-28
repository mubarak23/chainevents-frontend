"use client";

import React, { Suspense, useEffect, useCallback } from 'react';
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import Pagination from "@/components/Pagination";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "@starknet-react/core";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const fetchUserEvents = async ({ queryKey }) => {
  const { event_owner_address, page, per_page } = queryKey[0];

  const params = new URLSearchParams();
  if (page) params.append("page", page.toString());
  if (per_page) params.append("per_page", per_page.toString());

  const url = `https://chainevents-backend.onrender.com/event/owner/${event_owner_address}?${params}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  return response.json();
};

function YourEventsContent() {
  const { address } = useAccount();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page")) || 1;
  const perPage = 5;

  const handlePageChange = useCallback((newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.replace(`${pathname}?${params.toString()}`);
  }, [searchParams, router, pathname]);

  const { data, error, isLoading} = useQuery({
    queryKey: [{
       event_owner_address: address,
       page: currentPage,
       per_page: perPage
    }],
    queryFn: fetchUserEvents,
    enabled: !!address,
  });

  const events = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;
  
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      handlePageChange(totalPages);
    }
  }, [currentPage, totalPages, handlePageChange]);

  if (!address) {
    return <p>Please connect your wallet to view your events.</p>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-white">{error.message}</p>;
  }

  return (
    <>
      {events.length ? (
        <>
          {events.map((event, index) => (
            <EventCard key={index} event={event} baseRoute="your-events" />
          ))}

          {/* Pagination Component stays with the content that uses the hooks */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p className="text-white">You don't have any events, please add one!</p>
      )}
    </>
  );
}

const YourEvents = () => {
  return (
    <div className="text-white overflow-x-hidden flex flex-col items-center text-center bg-primaryBackground bg-[#1E1D1D] min-h-screen">
      <Navbar />
      <main className="pt-[74px] pb-[197px]">
        <div className="flex justify-between mb-4 items-center w-[740px]">
          <h1 className="text-base leading-5 font-medium text-white">Event Name</h1>
          <button className="bg-[#34C759] text-white flex items-center px-3 py-2 gap-2 rounded text-sm">
            <Image src={"/assets/globe.svg"} width={16} height={16} alt="globe" />
            <span>Public</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
  
        <div className="w-[740px] flex flex-col gap-y-4">
          <Suspense fallback={
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          }>
            <YourEventsContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default YourEvents;