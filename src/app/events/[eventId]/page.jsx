"use client";
import { contractAbi } from "@/abi/abi";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ApprovalIcon from "@/icons/ApprovalIcon";
import ValidationApprovalIcon from "@/icons/ValidationApprovalIcon";
import { contractAddress } from "@/utils/address";
import { useContractFetch } from "@/utils/helpers";
import React, { useEffect, useState } from "react";

function page({ params }) {
  const [eventData, setEventData] = useState(null);
  const { eventId } = React.use(params);

  // const eventIdBigInt = {
  //   type: "struct",
  //   low: BigInt(eventId || "1"),
  //   high: BigInt(0),
  // };

  useEffect(() => {
    async function fetchEventDetails() {
      try {
        let request = await fetch(
          "https://chainevents-backend.onrender.com/event/id/1"
        );
        if (!request.ok) {
          throw new Error("Failed to fetch data");
        }
        let response = await request.json();
        if (data?.length === 0) {
          console.log("No data");
          setEventData([]);
          return;
        }
        console.log(response.data);
        setEventData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchEventDetails();
  }, []);

  const { data, isLoading, error, isFetching } = useContractFetch(
    contractAbi,
    "event_details",
    contractAddress,
    [1]
  );

  const processEventData = (rawData) => {
    if (!rawData) return null;

    return {
      name: rawData.name?.replace(/"/g, "") || "Unknown Event",
      location: rawData.location || "Unknown Location",
      organizer: rawData.organizer?.toString() || "Unknown Organizer",
      totalRegister: Number(rawData.total_register) || 0,
      totalAttendees: Number(rawData.total_attendees) || 0,
      eventType: rawData.event_type?.variant === "Free" ? "Free" : "Paid",
      isClosed: rawData.is_closed === true,
      paidAmount: Number(rawData.paid_amount) || 0,
    };
  };

  useEffect(() => {
    if (data) {
      const processed = processEventData(data);
      console.log("Processed event data:", processed);
      //setEventData(processed);
    }
  }, [data]);

  if (isLoading || isFetching) {
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
    <div className="text-white overflow-x-hidden flex flex-col items-center bg-primaryBackground bg-[#1E1D1D] min-h-screen">
      <Navbar />
      <main className="pt-[74px] pb-[197px]">
        <div className="w-[740px] mx-auto bg-[#1E1D1D] rounded border-[.3px] border-[#FFFFFF] p-4 grid grid-cols-[250px_1fr] gap-x-6">
          <div>
            <img
              src={`${eventData?.["event_image_url"] ?? "/assets/eventImage.png"}`}
              className="w-full mb-4"
              alt=""
            />
            <h3 className="pb-2 border-b-[.4px] border-b-[#C4C4CC44] mb-2">
              Hosted By
            </h3>
            <div className="flex flex-col gap-y-2 text-xs leading-4 font-medium py-2 mb-6">
              <div className="flex gap-x-2 items-center">
                <img src="/assets/host-avatar.svg" className="w-5 h-5" alt="" />
                <h3>{eventData?.["event_owner"]}</h3>
              </div>
              <div className="flex gap-x-2 items-center">
                <img src="/assets/host-avatar.svg" className="w-5 h-5" alt="" />
                <h3>{eventData?.["event_email"]}</h3>
              </div>
            </div>

            <h3 className="text-[#D9D9D9] text-xs leading-4">Contact Host</h3>
            <h3 className="text-[#D9D9D9] text-xs leading-4">
              {eventData?.["event_email"]}
            </h3>
            <h3 className="text-[#D9D9D9] mt-3 text-xs leading-4">
              Report Event
            </h3>
          </div>
          <div>
            <h2 className="text-xl leading-6 font-semibold mb-4">
              {eventData?.name}
            </h2>
            <div className="flex items-center">
              <img src="/" alt="" />
              <div>
                <h3 className="font-medium text-sm">{eventData?.location}</h3>
                <h4 className="text-[#D9D9D9] text-xs">
                  No, 1 Technology City Boulevard/Crocodile road
                </h4>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <img src="/" alt="" />
              <div>
                <h3 className="font-medium text-sm">Friday, Sep 6</h3>
                <h4 className="text-[#D9D9D9] text-xs">
                  {eventData?.["event_start_date"] ?? "10:00 AM"} -{" "}
                  {eventData?.["event_end_date"] ??
                    `12:00 PM GMT
                  +1`}
                </h4>
              </div>
            </div>
            <div className="p-2 pb-6 rounded bg-[#C4C4C40D] mt-[34px]">
              <h2 className="pb-2 text-xs border-b-[#C4C4CC44] border-b-[.4px] font-semibold text-white mb-4">
                Registration
              </h2>
              <div className="flex items-center mt-4 gap-2">
                <ValidationApprovalIcon />
                <div>
                  <h3 className="font-medium text-sm">Approval Required</h3>
                  <h4 className="text-[#D9D9D9] text-xs">
                    Your registration is subject to approval by the host
                  </h4>
                </div>
              </div>
              <p className="text-xs font-semibold mt-5 mb-4">
                Welcome to join the Event, Please register below
              </p>

              {eventData?.["open_for_registration"] && (
                <button className="py-2 text-sm font-semibold rounded-full text-[#3A3A3A] bg-[#D9D9D9] w-full">
                  Request to Join
                </button>
              )}
            </div>
            <h2 className="pb-2 text-xs border-b-[#C4C4CC44] border-b-[.4px] font-semibold text-white mb-4 mt-4">
              About Event
            </h2>
            <p className="text-xs leading-5">
              {eventData?.description ??
                ` Get hyped for the ultimate mixer at Devcon 🎉, brought to you by
              StarkWare & Pantera Capital & Braavos🚀 Vibe out with fellow
              crypto people 🪙 at a party where the drinks flow 🍹, the food is
              on point 🍣, and connections spark 🔥 We&apos;re turning the Stark
              Space in Bangkok into the place to be 🌆 on November 13th. Come at
              8 p.m., mingle with developers 👨‍💻👩‍💻 and other blockchain pioneers
              🛠️, and soak in the energy ⚡ Spots are limited, so it&apos;s
              first come, first served—make sure to get there early to secure
              your place! ✨✨✨`}
            </p>
            <h2 className="pb-2 text-xs border-b-[#C4C4CC44] border-b-[.4px] font-semibold text-white mb-4 mt-4">
              Location
            </h2>
            <h3 className="text-sm font-semibold">{eventData?.location}</h3>
            <h4 className="text-xs text-[#D9D9D9]">
              No, 1 Technology City Boulevard/Crocodile road
            </h4>
            <img src="/assets/map.png" className="w-full mt-3" alt="" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default page;
