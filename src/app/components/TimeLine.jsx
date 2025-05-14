import { events } from "../events";
import TimelineClient from "../components/TimeLineClient";

const parseEventDate = (dateString) => {
  const months = {
    января: 0,
    февраля: 1,
    марта: 2,
    апреля: 3,
    мая: 4,
    июня: 5,
    июля: 6,
    августа: 7,
    сентября: 8,
    октября: 9,
    ноября: 10,
    декабря: 11,
  };

  try {
    const year = parseInt(dateString.match(/\d{4}/)?.[0] || "1917");
    const month =
      Object.entries(months).find(([m]) =>
        dateString.toLowerCase().includes(m),
      )?.[1] ?? 0;
    const day = parseInt(dateString.match(/^\d{1,2}/)?.[0] || "1");
    return new Date(year, month, day);
  } catch {
    return new Date(1917, 0, 1);
  }
};

const sortedEvents = [...events].sort(
  (a, b) => parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime(),
);

export default function Timeline() {
  return <TimelineClient events={sortedEvents} />;
}
