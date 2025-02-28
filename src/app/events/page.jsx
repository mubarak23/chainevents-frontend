"use client";

import React, { Suspense } from 'react';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import EventsList from "@/components/EventsList";
import EventStripSkeleton from "@/components/skeletons/EventStripSkeleton";

function EventsPage() {
  return (
    <div className="text-white overflow-x-hidden flex flex-col items-center text-center bg-primaryBackground bg-[#1E1D1D] min-h-screen">
      <Navbar />
      <main className="pt-[74px] pb-[197px]">
        <Suspense fallback={
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Events</h3>
            <div className="flex flex-col gap-y-4">
              {[...Array(5)].map((_, index) => (
                <EventStripSkeleton key={index} />
              ))}
            </div>
          </div>
        }>
          <EventsList />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default EventsPage;