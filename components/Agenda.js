import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/fr";
import axios from "axios";
import { EventForm } from "components/EventForm";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("fr");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSelect = ({ start, end }) => {
    const selectedEvent = eventsData.find((event) => {
      return (
        moment(event.start).isSame(start, "minutes") &&
        moment(event.end).isSame(end, "minutes")
      );
    });

    if (selectedEvent) {
      setSelectedSlot(selectedEvent);
    } else {
      setSelectedSlot({
        start,
        end,
        title: "", // You can set default values for the new event here
      });
    }

    setIsModalOpen(true);
  };

  const handleNavigation = (date) => {
    console.log("Navigated to date:", date);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSlot(null);
  };

  useEffect(() => {
    const fetchEventsFromDatabase = async () => {
      try {
        const response = await fetch("/api/events"); // Replace with your actual API URL
        if (response.ok) {
          const data = await response.json();

          const formattedEvents = data.map((event) => ({
            id: event.id, // Replace 'id' with the primary key column name in your database
            title: event.titre,
            start: new Date(event.datestart),
            end: new Date(event.dateend),
          }));

          setEventsData(formattedEvents);
        } else {
          console.error("Error fetching events from the database");
        }
      } catch (error) {
        console.error("Error fetching events from the database:", error);
      }
    };

    fetchEventsFromDatabase();
  }, []);

  const calendarStyles = {
    backgroundColor: "bg-gray-100",
    weekdayBackgroundColor: "bg-gray-300",
    dayBackgroundColor: "bg-white",
    dayTextColor: "text-gray-900",
    weekdayTextColor: "text-gray-600",
    headerTextColor: "text-gray-800",
    borderColor: "border-gray-300",
    eventTextColor: "text-white",
    eventBackgroundColor: "bg-blue-500",
  };

  const headerCellStyle = "bg-gray-200 text-center font-bold";

  return (
    <div className="h-full p-5">
      <Calendar
        views={["day", "month", "week", "agenda"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "85vh", ...calendarStyles }}
        headerStyle={headerCellStyle}
        onSelectEvent={handleSelect}
        onSelectSlot={handleSelect}
        onNavigate={handleNavigation}
        messages={{
          today: "Aujourd'hui",
          previous: "Précédent",
          next: "Suivant",
          month: "Mois",
          week: "Semaine",
          day: "Jour",
          agenda: "Agenda",
          date: "Date",
          time: "Heure",
          event: "Événement",
          allDay: "Toute la journée",
          showMore: (total) => `+ Voir plus (${total})`,
        }}
      />
      {isModalOpen && selectedSlot && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-gray-500 z-50">
          <div className="text-center relative z-50">
            <button
              className="absolute top-2 right-2 text-red-600 hover:text-red-800 focus:outline-none text-lg"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <div className="flex flex-col items-center justify-center h-full">
              <EventForm selectedSlot={selectedSlot} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
