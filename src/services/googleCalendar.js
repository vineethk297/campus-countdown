export async function fetchGoogleCalendarEvents(accessToken) {
  const now = new Date().toISOString();
  const timeMax = new Date(Date.now() + 50 * 24 * 60 * 60 * 1000).toISOString();
  const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(now)}&timeMax=${encodeURIComponent(timeMax)}&singleEvents=true&orderBy=startTime`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) throw new Error("Failed to fetch Google Calendar events.");

  const data = await res.json();
  return (data.items || [])
    .filter((e) => e.start?.dateTime || e.start?.date)
    .map((e) => ({
      id: Date.now() + Math.random(),
      title: e.summary || "Untitled Event",
      date: e.start.dateTime || `${e.start.date}T00:00:00`,
      category: "academic",
      pinned: false,
    }));
}
