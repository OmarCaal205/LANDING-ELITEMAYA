import { dayNames } from "./data.js";

const TZ = "America/Guatemala";
const WEEKDAY = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

// Día de la semana y minutos desde la medianoche, en hora de Guatemala
export function guatemalaNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type)?.value;
  return {
    day: WEEKDAY[get("weekday")],
    minutes: (Number(get("hour")) % 24) * 60 + Number(get("minute")),
  };
}

export const toMin = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

// "21:00" -> "9:00 p. m."
export function fmt12(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "p. m." : "a. m.";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function openStatus(hoursMap, now) {
  const { day, minutes } = now;
  const today = hoursMap[day];
  if (today && minutes >= toMin(today[0]) && minutes < toMin(today[1])) {
    return { open: true, text: `Abierto ahora, cierra a las ${fmt12(today[1])}` };
  }
  if (today && minutes < toMin(today[0])) {
    return { open: false, text: `Cerrado, abre hoy a las ${fmt12(today[0])}` };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const h = hoursMap[d];
    if (h) {
      const when = i === 1 ? "mañana" : `el ${dayNames[d].toLowerCase()}`;
      return { open: false, text: `Cerrado, abre ${when} a las ${fmt12(h[0])}` };
    }
  }
  return { open: false, text: "Cerrado" };
}
