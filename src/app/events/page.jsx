import { events } from "../events";

import EventsClient from "../components/EventClient";
export const revalidate = 3600;

export const metadata = {
  title: "События Революции 1917",
};

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#300000] bg-fixed bg-cover flex flex-col items-center justify-start p-4 py-8 sm:p-6 md:p-8 relative before:content-[''] before:absolute before:inset-0 before:bg-[url('data:image/png;base64,...')] before:opacity-10 before:pointer-events-none before:bg-fixed">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-[#D4A017] mb-8 sm:mb-10 mt-6 sm:mt-8 text-center tracking-tight">
        События Революции
      </h1>
      <EventsClient events={events} />
    </div>
  );
}
