import Link from "next/link";

const sampleThumbnail = "/assets/sample-thumbnail.png";
const calendar = "/assets/calender.svg";

function EventStrip({ thumbnail, title, subTitle, date, eventId }) {
  return (
    <div className="w-full py-[22px] px-[24px] bg-[#0D0C0C] flex justify-between items-center">
      <div className="flex items-stretch gap-x-[11px]">
        <img src={thumbnail || sampleThumbnail} alt={title} />
        <div>
          <h3 className="mb-1 text-xl font-medium text-white">{title}</h3>
          <h5 className="text-sm text-[#C4C4C4] pb-[11px] border-b-white border-b-[0.3px]">
            {subTitle}
          </h5>
          <h4 className="text-sm text-[#08C51A] gap-x-2 mt-2 flex items-center">
            <img src={calendar} alt="Calendar icon" />
            {date}
          </h4>
        </div>
      </div>
      <Link
        href={`/app/event/${eventId}`}
        className="py-4 px-[44px] bg-white rounded-[5px] text-sm font-medium text-[#121212]"
      >
        Go to event
      </Link>
    </div>
  );
}

export default EventStrip;
