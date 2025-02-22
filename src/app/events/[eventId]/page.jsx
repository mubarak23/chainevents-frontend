"use client";
import { contractAbi } from "@/abi/abi";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ApprovalIcon from "@/icons/ApprovalIcon";
import ValidationApprovalIcon from "@/icons/ValidationApprovalIcon";
import { contractAddress } from "@/utils/address";
import { useContractFetch } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Page({ params }) {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { eventId } = params;

  // Fetch event data from the API
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(
          `https://chainevents-backend.onrender.com/event/id/${eventId}`
        );
        if (response.data.success) {
          setEventData(response.data.data);
        } else {
          throw new Error("Failed to fetch event data");
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  if (loading) {
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

  if (!eventData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white">No event data found.</div>
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
              src={
                eventData.event_image_url ||
                "/assets/eventImage.png" // Fallback image
              }
              className="w-full mb-4"
              alt={eventData.name}
            />
            <h3 className="pb-2 border-b-[.4px] border-b-[#C4C4CC44] mb-2">
              Hosted By
            </h3>
            <div className="flex flex-col gap-y-2 text-xs leading-4 font-medium py-2 mb-6">
              <div className="flex gap-x-2 items-center">
                <img
                  src="/assets/host-avatar.svg"
                  className="w-5 h-5"
                  alt="Host Avatar"
                />
                <h3>{eventData.event_owner}</h3>
              </div>
              <div className="flex gap-x-2 items-center">
                <img
                  src="/assets/host-avatar.svg"
                  className="w-5 h-5"
                  alt="Host Avatar"
                />
                <h3>{eventData.event_email}</h3>
              </div>
            </div>

            <h3 className="text-[#D9D9D9] text-xs leading-4">Contact Host</h3>
            <h3 className="text-[#D9D9D9] mt-3 text-xs leading-4">
              Report Event
            </h3>
          </div>
          <div>
            <h2 className="text-xl leading-6 font-semibold mb-4">
              {eventData.name}
            </h2>
            <div className="flex items-center">
              <img src="/" alt="" />
              <div>
                <h3 className="font-medium text-sm">{eventData.location}</h3>
                <h4 className="text-[#D9D9D9] text-xs">
                  {eventData.event_start_date
                    ? new Date(eventData.event_start_date).toLocaleString()
                    : "Date not available"}
                </h4>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <img src="/" alt="" />
              <div>
                <h3 className="font-medium text-sm">
                  {eventData.event_end_date
                    ? new Date(eventData.event_end_date).toLocaleString()
                    : "End date not available"}
                </h3>
                <h4 className="text-[#D9D9D9] text-xs">
                  {eventData.event_mode || "Event mode not specified"}
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
                  <h3 className="font-medium text-sm">
                    {eventData.require_approval
                      ? "Approval Required"
                      : "No Approval Required"}
                  </h3>
                  <h4 className="text-[#D9D9D9] text-xs">
                    {eventData.require_approval
                      ? "Your registration is subject to approval by the host"
                      : "Your registration will be automatically approved"}
                  </h4>
                </div>
              </div>
              <p className="text-xs font-semibold mt-5 mb-4">
                Welcome to join the Event, Please register below
              </p>

              <button className="py-2 text-sm font-semibold rounded-full text-[#3A3A3A] bg-[#D9D9D9] w-full">
                Request to Join
              </button>
            </div>
            <h2 className="pb-2 text-xs border-b-[#C4C4CC44] border-b-[.4px] font-semibold text-white mb-4 mt-4">
              About Event
            </h2>
            <p className="text-xs leading-5">
              {eventData.description || "No description available."}
            </p>
            <h2 className="pb-2 text-xs border-b-[#C4C4CC44] border-b-[.4px] font-semibold text-white mb-4 mt-4">
              Location
            </h2>
            <h3 className="text-sm font-semibold">{eventData.location}</h3>
            <h4 className="text-xs text-[#D9D9D9]">
              {eventData.event_start_date
                ? new Date(eventData.event_start_date).toLocaleString()
                : "Location details not available"}
            </h4>
            <img
              src="/assets/map.png"
              className="w-full mt-3"
              alt="Event Location Map"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Page;