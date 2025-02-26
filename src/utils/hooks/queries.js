import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../env.config";

export function useGetEvent() {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/event`);
      if (!response.ok) throw new Error("Failed to fetch events");
      const data = await response.json();
      return data.data;
    },
  });
}
export function useGetEventDetails(eventId) {
  return useQuery({
    queryKey: ["event", eventId], // Unique cache key
    queryFn: async () => {
      if (!eventId) return null;
      const response = await fetch(`${baseUrl}/event/id/${eventId}`);
      if (!response.ok) throw new Error("Failed to fetch event details");
      const data = await response.json();
      return data.data;
    },
    enabled: !!eventId, 
  });
}
