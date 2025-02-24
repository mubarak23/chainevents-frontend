"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

const EventCard = ({ event, baseRoute }) => {
  let router = useRouter();

  if (!event) return null;

  return (
    <div className="text-white text-xs leading-4">
      <h4 className="w-full py-2 px-[11px] font-semibold text-left">
        {/* Sep 6, Friday */}
        {new Date(event.created_at).toDateString()}
      </h4>
      <div className="border-[#F5F5F5] border-[.3px] pt-[26px] pb-4 px-6 bg-[#1E1D1D] flex items-stretch gap-x-4 rounded">
        <img
          src={event?.event_image_url ?? "/assets/eventImage.png"}
          className="w-[113px] h-[117px] rounded"
          alt=""
        />
        <div className="text-[10px] leading-3 text-[#D9D9D9CC] font-medium text-left space-y-2">
          <div className="flex items-center gap-x-2">
            <Image src="/assets/time.svg" alt="" width={14} height={14} />
            <h5>
              {new Date(event.created_at).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </h5>
          </div>

          <button
            onClick={() => {
              if (baseRoute === "your-events") return;
              router.push(`/${baseRoute}/1`);
            }}
            className="text-sm leading-[18px] text-white font-semibold"
          >
            {event.name}
          </button>

          <h5>Lagos, Nigeria</h5>

          <div className="flex items-center gap-x-2">
            <Image src="/assets/location.svg" alt="" width={14} height={14} />
            <h5>{event.location}</h5>
          </div>

          <div className="flex gap-x-[10px]">
            {baseRoute === "your-events" && (
              <button
                className="p-[6px] bg-[#D9D9D9] rounded-sm text-[#3A3A3A]"
                onClick={() => {
                  router.push(`/${baseRoute}/${event.id}`);
                }}
              >
                Manage Event <span></span>
              </button>
            )}
            <img src="/assets/attendees.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
