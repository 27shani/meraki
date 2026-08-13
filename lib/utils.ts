export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** ISO datetime for the event start — single source of truth for countdown + schema. */
export const EVENT_START_ISO = "2026-10-23T09:00:00+05:30";
export const EVENT_END_ISO = "2026-10-25T18:00:00+05:30";
export const EVENT_VENUE = "Fortune Institute of International Business, New Delhi";
export const EVENT_ADDRESS = {
  street: "Plot No. 5, Rao Tula Ram Marg, Opp. Army R&R Hospital, Vasant Vihar",
  city: "New Delhi",
  postalCode: "110057",
  country: "IN",
};
