import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export function EventForm() {
  const [event, setEvent] = useState({
    titre: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async (id) => {
      try {
        const { data } = await axios.get("/api/events/" + id);
        setEvent(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (router.query?.id) {
      fetchEvent(router.query.id);
    }
    console.log("called");
  }, [router.query.id]);

  const handleChange = ({ target: { name, value } }) =>
    setEvent({ ...event, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (router.query?.id) {
        await axios.put("/api/events/" + router.query.id, {
          titre: event.titre,
          datestart: event.datestart,
          datefin: event.datefin,
        });
        toast.success("Task Updated", {
          position: "bottom-center",
        });
      } else {
        await axios.post("/api/events", event);
        toast.success("Task Saved", {
          position: "bottom-center",
        });
      }

      router.push("/events");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
            htmlFor="titre"
          >
            Titre du rendez-vous :
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            type="text"
            placeholder="titre"
            id="titre"
            name="titre"
            onChange={handleChange}
            value={event.titre}
            autoComplete="off"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="datestart"
            className="block text-gray-700 dark:text-white font-bold mb-2 text-sm"
          >
            Date de début :
          </label>
          <input
            type="datetime-local"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            id="datestart"
            name="datestart"
            onChange={handleChange}
            value={event.datestart}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="dateend"
            className="block text-gray-700 dark:text-white font-bold mb-2 text-sm"
          >
            Date de début :
          </label>
          <input
            type="datetime-local"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            id="dateend"
            name="dateend"
            onChange={handleChange}
            value={event.dateend}
          />
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {router.query?.id ? "Update Event" : "Save Event"}
        </button>
      </form>
    </div>
  );
}
