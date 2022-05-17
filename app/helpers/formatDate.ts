export function formatDate(dateText: string) {
  const dte = new Date(dateText);
  const dayNumber = dte.getDay(),
    monthNumber = dte.getMonth(),
    year = dte.getFullYear();
  const day = weekDays[dayNumber];
  const month = months[monthNumber];
  const baseHour = dte.getHours() > 12 ? dte.getHours() - 12 : dte.getHours();
  const meridiem = dte.getHours() >= 12 ? "pm" : "am";
  const hour = baseHour < 10 ? `0${baseHour}` : `${baseHour}`;
  const minutes = dte.getMinutes() < 10 ? "00" : `${dte.getMinutes()}`;

  return [`${day} ${month} ${year}`, `${day}`, `${hour}:${minutes} ${meridiem}`];
}

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Oct",
  "Sep",
  "Nov",
  "Dec",
];
