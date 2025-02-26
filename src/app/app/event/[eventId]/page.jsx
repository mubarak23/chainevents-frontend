"use client";

import React from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useGetEventDetails } from "@/utils/hooks/queries";

function EventDetailsPage() {
  const router = useRouter();
  const params = useParams(); 

  const eventId = params?.eventId; 

  const { data: eventData, isLoading, error } = useGetEventDetails(eventId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white">Loading event details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-6 bg-red-100 text-red-700">
          Error fetching event details: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[2.6fr_1fr] gap-x-4">
      <div className="relative bg-[#0D0C0C] w-full h-[85vh] overflow-y-scroll pt-[102px] px-[49px] pb-[56px] text-white">
        <div className="absolute top-6 left-6 flex items-center gap-x-4 text-base font-medium">
          <button onClick={() => router.back()} className="flex gap-x-2 items-center py-1 pr-4 border-r-[#FF4B8B] border-r-[1px]">
            <Image src="/left-arrow.svg" alt="Back" width={30} height={30} />
            Back
          </button>
          <h6>{eventData?.name || "chainEvent"}</h6>
        </div>

        <Image
          src={eventData?.event_image_url || "/sampleBanner.png"}
          className="w-full"
          alt="Event banner"
          width={500}
          height={500}
        />

        <h3 className="text-2xl font-bold mt-4">{eventData?.name || "chainEvent"}</h3>
        <h4 className="text-base text-[#878787]">{eventData?.description || "Exploring the StarkNet ecosystem"}</h4>
        
        <div className="flex mt-2 items-center mb-[23px] gap-x-6 text-sm text-[#66E372]">
          <div className="flex items-center gap-x-2">
            <Image src="/calendar-tick.svg" alt="" width={30} height={30} />
            <h6>{eventData?.event_start_date ? `${eventData.event_start_date} - ${eventData.event_end_date || "TBD"}` : "24th March - 26th March 2024"}</h6>
          </div>
          <div className="flex items-center gap-x-2">
            <Image src="/locationIcon.svg" alt="Location" width={30} height={30} />
            <h6>{eventData?.location || "Lagos"}</h6>
          </div>
        </div>

        <div className="pt-4 text-white text-[12px]">
          <h1 className="font-bold text-sm leading-8">About This Event</h1>
          <p>
            {eventData?.description || "Join us for an exciting and insightful event dedicated to the StarkNet ecosystem!"}
          </p>
        </div>
      </div>

      <div className="pt-6 pb-[65px] bg-[#0D0C0C] text-white px-[23px]">
        <h2 className="text-base font-medium text-center pb-5 border-b-[0.5px] border-[#FAA2C1] mb-4">
          Details
        </h2>

        <div className="text-base flex flex-col gap-y-4 pb-4 border-b-[0.5px] border-b-[#FAA2C1] mb-4">
          <h3>
            <span className="text-[#878787] font-medium">Format:</span> {eventData?.event_mode || "In-Person"}
          </h3>
          <h3>
            <span className="text-[#878787] font-medium">Event Type:</span> {eventData?.event_type || "Free"}
          </h3>
          <h3>
            <span className="text-[#878787] font-medium">Main link: </span>
            <a href="https://meet.google.com/iyu-ngra-meu" className="text-blue-400">Google Meet</a>
          </h3>
          <h3>
            <span className="text-[#878787] font-medium">Social: </span>@starkware
          </h3>
        </div>

        <div className="text-base flex flex-col pb-4 border-b-[0.5px] border-b-[#FAA2C1] mb-4">
          <h4 className="flex items-center gap-x-1 text-xs font-medium text-[#878787] mb-2">
            <Image src="/locationIcon.svg" alt="Location" width={30} height={30} /> Location
          </h4>
          <h3>{eventData?.location || "Lagos"}</h3>
        </div>

        <div className="text-base flex flex-col pb-4 border-b-[0.5px] border-b-[#FAA2C1]">
          <h4 className="text-xs font-medium mb-2">{eventData?.event_capacity || 0} Attendees Capacity</h4>
          <Image src="/attendees.svg" className="w-[122px] mb-1" alt="Attendees" width={30} height={30} />
          <h6 className="text-[8px] font-medium">Some attendees are registered</h6>
        </div>
      </div>
    </div>
  );
}

export default EventDetailsPage;
