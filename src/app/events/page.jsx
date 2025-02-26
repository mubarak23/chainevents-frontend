"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import EventsList from "@/components/EventsList";

function EventsPage() {
  return (
    <div className="text-white overflow-x-hidden flex flex-col items-center text-center bg-primaryBackground bg-[#1E1D1D] min-h-screen">
      <Navbar />
      <main className="pt-[74px] pb-[197px]">
        <EventsList />
      </main>
      <Footer />
    </div>
  );
}

export default EventsPage;
