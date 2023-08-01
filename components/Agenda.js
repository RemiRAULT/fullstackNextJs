'use client'
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("fr-fr");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState(events);

  const handleSelect = ({ start, end }) => {
    console.log(start);
    console.log(end);
    const title = window.prompt("New Event name");
    if (title)
      setEventsData([
        ...eventsData,
        {
          start,
          end,
          title,
        },
      ]);
  };

  const handleNavigation = (date) => {
    // Your code for handling navigation (e.g., changing the displayed date)
    console.log("Navigated to date:", date);
  };

  return (
    <div className="App">
      <Calendar
        views={["day", "agenda", "work_week", "month", "week"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "85vh" }}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
        onNavigate={handleNavigation}
        components={{
          toolbar: CustomToolbar,
          event: CustomEvent,
          agenda: {
            event: CustomAgendaEvent,
          },
        }}
      />
    </div>
  );
}

// CustomToolbar component to style the calendar header
function CustomToolbar({ label, onView, onNavigate }) {
  const today = moment().format("LL"); // Get the formatted current date
  const handlePrev = () => {
    onNavigate("PREV");
  };

  const handleNext = () => {
    onNavigate("NEXT");
  };

  return (
    <div className="bg-gray-200 dark:bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex space-x-4">
      <button
          className="px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white focus:outline-none"
          onClick={handlePrev}
        >
          Précédent
        </button>
        <button
          className="px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white focus:outline-none"
          onClick={handleNext}
        >
          Suivant
        </button>
      </div>
      <span className="text-gray-700 dark:text-white font-bold text-lg">
        {label}
      </span>
      <div className="flex space-x-4">
        <button
          className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white focus:outline-none"
          onClick={() => onView("month")}
        >
          Mois
        </button>
        <button
          className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white focus:outline-none"
          onClick={() => onView("week")}
        >
          Semaine
        </button>
        <button
          className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white focus:outline-none"
          onClick={() => onView("day")}
        >
          Jour
        </button>
      </div>
    </div>
  );
}

// CustomEvent component to style the individual events on the calendar
function CustomEvent({ event }) {
  return (
    <div className="custom-event">
      <span className="event-title">{event.title}</span>
    </div>
  );
}

// CustomAgendaEvent component to style the events in the agenda view
function CustomAgendaEvent({ event }) {
  return (
    <div className="custom-agenda-event">
      <span className="event-title">{event.title}</span>
      <span className="event-time">
        {moment(event.start).format("h:mm A")} - {moment(event.end).format("h:mm A")}
      </span>
    </div>
  );
}
