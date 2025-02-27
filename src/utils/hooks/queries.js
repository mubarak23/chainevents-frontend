import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../env.config";

export function useGetEvent(options = {}) {
  const { page = 1, per_page = 5 } = options;
  
  return useQuery({
    queryKey: ["events", page, per_page],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("per_page", per_page.toString());
      
      const url = `${baseUrl}/event?${params}`;
      const response = await fetch(url);
      
      if (!response.ok) throw new Error("Failed to fetch events");
      
      const data = await response.json();
      
      // Return both the data and pagination info
      return {
        data: data.data || [],
        pagination: data.pagination || { totalPages: 1, currentPage: page }
      };
    },
  });
}