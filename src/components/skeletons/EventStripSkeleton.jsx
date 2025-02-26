import React from "react";

const EventStripSkeleton = () => {
  return (
    <div className="max-w-[700px] md:w-[600px] py-[22px] px-[24px] bg-[#0D0C0C] flex justify-between items-center animate-pulse">
      <div className="flex items-stretch gap-x-[11px]">
        <div className="w-[100px] h-[100px] bg-gray-200 rounded" />

        <div>
          <div className="h-6 w-48 bg-gray-200 rounded mb-1" />

          <div className="h-4 w-36 bg-gray-200 rounded mb-[11px] pb-[11px] border-b-white border-b-[0.3px]" />

          <div className="flex items-center gap-x-2 mt-2">
            <div className="w-4 h-4 bg-gray-200 rounded" />

            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      <div className="py-4 px-[44px] bg-gray-200 rounded-[5px] h-[40px]" />
    </div>
  );
};

export default EventStripSkeleton;
