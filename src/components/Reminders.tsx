import { useEffect, useState } from "react";

interface Event {
  id: number;
  event_date: string;
  event_time: string;
  title: string;
  description: string;
}

interface ReminderProps {
  userId: string;
}

const Reminder = ({ userId }: ReminderProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [reminder, setReminder] = useState<Event | null>(null);
  const [snoozeTime, setSnoozeTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log('Fetching events for user:', userId);
        const res = await fetch(`http://localhost/intro-section-backend/apis/getUserEvents.php?user_id=${userId}`, {
          credentials: 'include',
        });
        if (!res.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await res.json();
        console.log('Fetched events:', data);
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error('Unexpected response format:', data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, [userId]);

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date().getTime();
      console.log("Checking reminders at:", new Date(now).toLocaleTimeString());

      events.forEach((event) => {
        const eventTime = new Date(`${event.event_date}T${event.event_time}`).getTime();
        const remindTime = eventTime - (10 * 60 * 1000); // Default reminder time: 10 minutes before the event

        console.log(
          `Event: ${event.title}, Event Time: ${new Date(
            eventTime
          ).toLocaleTimeString()}, Remind Time: ${new Date(
            remindTime
          ).toLocaleTimeString()}`
        );

        // If current time is within the reminder window
        if (now >= remindTime && now < eventTime) {
          console.log("Setting reminder for event:", event.title);
          setReminder(event); // Trigger the reminder
          const timeDiff = eventTime - now;
          const minutesLeft = Math.floor(timeDiff / (1000 * 60));
          const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);
          setTimeLeft(`${minutesLeft} minutes and ${secondsLeft} seconds`);
        }
      });
    };

    const interval = setInterval(checkReminders, 60000); // Check every minute
    checkReminders(); // Initial check
    return () => clearInterval(interval);
  }, [events]);

  useEffect(() => {
    if (reminder) {
        console.log("Reminder SET:", reminder.title);
      const updateTimeLeft = () => {
        const now = new Date().getTime();
        const eventTime = new Date(`${reminder.event_date}T${reminder.event_time}`).getTime();
        const timeDiff = eventTime - now;
        const minutesLeft = Math.floor(timeDiff / (1000 * 60));
        const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);
        setTimeLeft(`${minutesLeft} minutes and ${secondsLeft} seconds`);
      };

      const interval = setInterval(updateTimeLeft, 1000); // Update every second
      updateTimeLeft(); // Initial update
      return () => clearInterval(interval);
    }
  }, [reminder]);

  const handleSnooze = () => {
    if (reminder) {
      const snoozeDuration = 5 * 60 * 1000; // 5 minutes
      setSnoozeTime(new Date().getTime() + snoozeDuration);
      setReminder(null);
    }
  };

  useEffect(() => {
    if (snoozeTime) {
      const snoozeInterval = setInterval(() => {
        const now = new Date().getTime();
        if (now >= snoozeTime) {
          setReminder(reminder);
          setSnoozeTime(null);
        }
      }, 1000);

      return () => clearInterval(snoozeInterval);
    }
  }, [snoozeTime, reminder]);

  return (
    <>
      {reminder && (
        <div className="fixed top-4 right-4 bg-yellow-300 p-4 rounded shadow-md z-50">
          <p className="font-bold">⏰ Reminder:</p>
          <p>{reminder.title} is coming up in {timeLeft}!</p>
          <button
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => setReminder(null)}
          >
            Dismiss
          </button>
          <button
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
            onClick={handleSnooze}
          >
            Snooze for 5 minutes
          </button>
        </div>
      )}
      {!reminder && <p>No reminders at the moment</p>}
    </>
  );
};

export default Reminder;
