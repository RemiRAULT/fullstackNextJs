import Link from "next/link";

export function EventCard({ event }) {
  return (
    <Link href={`/events/${event.id}`}>
      <a
        className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-3"
        key={event.id}
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {event.titre}
        </h5>
        <p className="font-bold text-gray-800 dark:text-gray-100 text-2xl"></p>
      </a>
    </Link>
  );
}
