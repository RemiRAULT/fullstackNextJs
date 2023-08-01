import axios from "axios";
import { EventForm } from "components/EventForm";
import { Layout } from "components/Layout";

function NewEvent() {
  return (
    <Layout>
      <div className="h-5/6 grid place-items-center">
        <EventForm />
      </div>
    </Layout>
  );
}
export default NewEvent;

export const getServerSideProps = async (context) => {
  const res = await axios.get("http://localhost:3000/api/events");

  return {
    props: {
      events: res.data,
    },
  };
};
