/** In-fiction time formatting. All case timestamps are ISO strings. */

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function parseTs(iso: string): Date {
  return new Date(iso);
}

export function clockTime(d: Date): string {
  let hr = d.getHours();
  const ampm = hr >= 12 ? "PM" : "AM";
  hr = hr % 12 || 12;
  return `${hr}:${String(d.getMinutes()).padStart(2, "0")} ${ampm}`;
}

export function shortDate(d: Date): string {
  return `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}`;
}

export function longDate(d: Date): string {
  return `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;
}

export function fullStamp(iso: string): string {
  const d = parseTs(iso);
  return `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()} · ${clockTime(d)}`;
}

export function dateStamp(iso: string): string {
  const d = parseTs(iso);
  return `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()}`;
}

export function dayLabel(iso: string): string {
  const d = parseTs(iso);
  return `${DAYS[d.getDay()]} · ${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}`;
}

export function monthName(monthIndex: number): string {
  return MONTHS[monthIndex];
}

export function mmss(totalSec: number): string {
  const m = Math.floor(totalSec / 60);
  const s = Math.floor(totalSec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}
