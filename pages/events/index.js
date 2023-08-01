import axios from "axios";
import { Layout } from "components/Layout";
import { EventCard } from "components/EventCard";

function EventsPage({ events = [] }) {
  const renderEvents = () => {
    if (events.length === 0) return <h1>No Events</h1>;
    return events.map((event) => (
      <EventCard key={event.id} event={event} />
    ));
  };

  return (
    <Layout>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        {renderEvents()}
      </div>
    </Layout>
  );
}

export default EventsPage;

export const getServerSideProps = async () => {
  const { data: events } = await axios.get(
    "http://localhost:3000/api/events"
  );

  return {
    props: {
      events,
    },
  };
};
