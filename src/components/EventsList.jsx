import EventStrip from "./EventStrip";
import EventStripSkeleton from "./skeletons/EventStripSkeleton";
import ErrorMessage from "./ErrorMessage";
import { useGetEvent } from "../utils/hooks/queries";
import { useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Pagination from "./Pagination";

function EventsList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Getting the  current page from URL or use 1
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const perPage = 5; // you can adjust this sir... based on your design.
  
  const { data, isLoading, isError, error } = useGetEvent({
    page: currentPage,
    per_page: perPage
  });
  
  // Extract the events and pagination info.
  const events = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;
  
  // Handling page changes
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };
  
  // Ensure current page is exists
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      handlePageChange(totalPages);
    }
  }, [currentPage, totalPages]);

  if (isLoading) {
    return (
      <div>
        <h3 className="text-white text-xl font-bold mb-4">Events</h3>
        <div className="flex flex-col gap-y-4">
          {[...Array(perPage)].map((_, index) => (
            <EventStripSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h3 className="text-white text-xl font-bold mb-4">Events</h3>
        <ErrorMessage message={error?.message || "Failed to load events"} />
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-white text-xl font-bold mb-4">Events</h3>
      <div className="flex flex-col gap-y-4">
        {events && events.length > 0 ? (
          <>
            {events.map((event) => (
              <EventStrip
                key={event.id}
                title={event.name}
                subTitle={event.description || "No description available"}
                date={event.event_start_date || "Date not available"}
                thumbnail={event.event_image_url || "assets/eventImg.jpeg"}
                id={event.id}
              />
            ))}
            
            {/* Add pagination component */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <p className="text-gray-400">No events available</p>
        )}
      </div>
    </div>
  );
}

export default EventsList;