export async function getEventData(eventId) {
    try {
      const res = await fetch(`https://chainevents-backend.onrender.com/event/id/${eventId}`, {
        cache: "no-store", // Prevents stale data
      });
  
      if (!res.ok) throw new Error("Failed to fetch event data");
  
      const data = await res.json();
      return data.success ? data.data : null;
    } catch (error) {
      console.error("Error fetching event:", error);
      return null;
    }
  }
  