import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Layout } from "components/Layout";
import moment from "moment";
import "moment/locale/fr"; 

function EventPage({ event }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await axios.delete("/api/events/" + id);
      toast.success("Task deleted");
      router.push("/agenda");
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
    const formattedDateStart = moment(event.datestart).format("DD/MM/YYYY HH:mm");
    const formattedDateEnd = moment(event.dateend).format("DD/MM/YYYY HH:mm");

  return (
    <Layout>
      <div className="p-6 bg-white dark:bg-gray-800">
        <p>Titre : {event.titre}</p>
        <p>Date de début : {formattedDateStart}</p>
        <p>Date de fin : {formattedDateEnd}</p>
      </div>

      <div className="mt-7 flex justify-center">
        <button
          className="bg-red-500 hover:bg-red-700 py-2 px-3 rounded"
          onClick={() => handleDelete(event.id)}
        >
          delete
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-800 ml-2 py-2 px-5 rounded"
          onClick={() => router.push("/events/edit/" + event.id)}
        >
          Edit
        </button>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ query }) => {
  const { data: event} = await axios.get(
    "http://localhost:3000/api/events/" + query.id
  );

  console.log(event)

  return {
    props: {
      event,
    },
  };
};

export default EventPage;
