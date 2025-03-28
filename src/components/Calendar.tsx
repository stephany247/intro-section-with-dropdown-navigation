import { useEffect, useState } from "react";

interface Event {
  id: number;
  event_date: string;
  event_time: string;
  title: string;
  description: string;
}

interface CalendarProps {
  userId: string;
}

const Calendar = ({ userId }: CalendarProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("Fetching events for user:", userId);
        const res = await fetch(
          `http://localhost/intro-section-backend/apis/getUserEvents.php?user_id=${userId}`,
          {
            credentials: "include",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await res.json();
        // console.log("Fetched events:", data);
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, [userId]);

  // Add new event
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding event with:", {
      eventDate,
      eventTime,
      eventTitle,
      eventDescription,
    });
    if (!eventDate || !eventTime || !eventTitle || !eventDescription) {
      console.error("Missing required fields");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost/intro-section-backend/apis/addEvent.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            user_id: userId,
            event_date: eventDate,
            event_time: eventTime,
            title: eventTitle,
            description: eventDescription,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add event");
      }

      const newEvent = await res.json();
      if (newEvent.error) {
        throw new Error(newEvent.error);
      }
      setEvents([...events, newEvent]); // Add the new event to state
      setEventDate("");
      setEventTime("");
      setEventTitle("");
      setEventDescription("");
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // Handle event deletion
  const handleDeleteEvent = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(
        "http://localhost/intro-section-backend/apis/deleteEvent.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ id }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete event");
      }

      setEvents(events.filter((event) => event.id !== id)); // Remove the event from state
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Calendar</h2>

      {/* Add Event Form */}
      <form onSubmit={handleAddEvent} className="mb-4">
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="border p-2 mr-2 rounded"
          required
        />
        <input
          type="time"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
          className="border p-2 mr-2 rounded"
          required
        />
        <input
          type="text"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          placeholder="Event title"
          className="border p-2 mr-2 rounded"
          required
        />
        <textarea
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          placeholder="Event description"
          className="border p-2 mr-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Event
        </button>
      </form>

      {/* Events List */}
      <ul>
        {events.map((event) => {
          const formattedDate = event.event_time
            ? new Date(
                `${event.event_date}T${event.event_time}`
              ).toLocaleString()
            : new Date(event.event_date).toLocaleDateString();

          return (
            <li key={event.id} className="mb-2 flex items-center">
              <input
                type="checkbox"
                onChange={() => handleDeleteEvent(event.id)}
                className="mr-2"
              />
              <div>
                {/* 📅 {new Date(`${event.event_date}T${event.event_time}`).toLocaleString()} - <span className="font-semibold">{event.title}</span> */}
                📅 {formattedDate} -{" "}
                {/* <span className="font-semibold">{event.title}</span>-{" "} */}
                <span className="font-semibold">{event.title}</span>
                <p>{event.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Calendar;
