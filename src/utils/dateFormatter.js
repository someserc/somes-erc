/**
 * Format date consistently on both server and client
 * Uses a fixed locale and timezone to avoid hydration mismatches
 */

export const formatDate = (dateString, options = {}) => {
  const {
    timeZone = "Asia/Kathmandu",
    locale = "en-US",
    dateStyle = "medium", // "short", "medium", "long", "full"
  } = options;

  try {
    const date = new Date(dateString);

    // Use Intl.DateTimeFormat for consistency
    const formatter = new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone,
    });

    return formatter.format(date);
  } catch (error) {
    console.error("Date formatting error:", error);
    return "";
  }
};

export const formatTime = (dateString, options = {}) => {
  const {
    timeZone = "Asia/Kathmandu",
    locale = "en-US",
    hour12 = true,
  } = options;

  try {
    const date = new Date(dateString);

    const formatter = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12,
      timeZone,
    });

    return formatter.format(date);
  } catch (error) {
    console.error("Time formatting error:", error);
    return "";
  }
};

export const formatDateTime = (dateString, options = {}) => {
  const {
    timeZone = "Asia/Kathmandu",
    locale = "en-US",
    hour12 = true,
  } = options;

  try {
    const date = new Date(dateString);

    const formatter = new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12,
      timeZone,
    });

    return formatter.format(date);
  } catch (error) {
    console.error("DateTime formatting error:", error);
    return "";
  }
};
