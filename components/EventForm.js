import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import moment from "moment";
import "moment/locale/fr";

export function EventForm({ selectedSlot }) {
  const [title, setTitle] = useState(selectedSlot.title || "");
  const [start, setStart] = useState(
    moment(selectedSlot.start).format("YYYY-MM-DDTHH:mm") || ""
  );
  const [end, setEnd] = useState(
    moment(selectedSlot.end).format("YYYY-MM-DDTHH:mm") || ""
  );
  const router = useRouter();

  const handleChange = ({ target: { name, value } }) => {
    if (name === "datestart") {
      setStart(value);
    } else if (name === "dateend") {
      setEnd(value);
    } else {
      setTitle(value);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedSlot.id) {
        await axios.put("/api/events/" + selectedSlot.id, {
          titre: title,
          datestart: start,
          dateend: end,
        });
        toast.success("Event Updated", {
          position: "bottom-center",
        });
      } else {
        await axios.post("/api/events", {
          titre: title,
          datestart: start,
          dateend: end,
        });
        toast.success("Event Saved", {
          position: "bottom-center",
        });
      }

      router.push("/agenda");
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("/api/events/" + id);
      toast.success("Event deleted");
      router.push("/agenda");
      window.location.reload();
    } catch (error) {
      console.error(error.response.data.message);
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
            value={title}
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
            value={start}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="dateend"
            className="block text-gray-700 dark:text-white font-bold mb-2 text-sm"
          >
            Date de fin :
          </label>
          <input
            type="datetime-local"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            id="dateend"
            name="dateend"
            onChange={handleChange}
            value={end}
          />
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {selectedSlot.id ? "Mettre à jour l'événement" : "Enregistrer l'événement"}
        </button>
        {selectedSlot.id && (
          <button
            className="bg-red-500 hover:bg-red-700 py-2 px-3 rounded mt-3"
            onClick={() => handleDelete(selectedSlot.id)}
          >
            Supprimer
          </button>
        )}
      </form>
    </div>
  );
}
