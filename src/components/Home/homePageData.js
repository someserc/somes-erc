"use client";

const homePageState = {
  data: null,
  promise: null,
};

const emptyHomePageData = {
  messages: [],
  events: [],
  testimonials: [],
  notices: [],
};

const parseJson = async (response, fallback) => {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();
  return fallback(data);
};

const loadHomePageData = async () => {
  const results = await Promise.allSettled([
    fetch("/api/messages").then((response) =>
      parseJson(response, (data) => data.data || [])
    ),
    fetch("/api/events").then((response) => parseJson(response, (data) => data || [])),
    fetch("/api/testimonial").then((response) =>
      parseJson(response, (data) => data.data || [])
    ),
    fetch("/api/notice").then((response) =>
      parseJson(response, (data) => data.docs || [])
    ),
  ]);

  const [messages, events, testimonials, notices] = results.map(
    (result, index) => {
      if (result.status === "fulfilled") {
        return result.value;
      }

      const sectionNames = ["messages", "events", "testimonials", "notices"];
      console.error(`Failed to preload ${sectionNames[index]}`, result.reason);
      return emptyHomePageData[sectionNames[index]];
    }
  );

  return {
    messages,
    events,
    testimonials,
    notices,
  };
};

export const getCachedHomePageData = () => homePageState.data;

export const fetchHomePageData = async () => {
  if (homePageState.data) {
    return homePageState.data;
  }

  if (!homePageState.promise) {
    homePageState.promise = loadHomePageData()
      .then((data) => {
        homePageState.data = data;
        return data;
      })
      .finally(() => {
        homePageState.promise = null;
      });
  }

  return homePageState.promise;
};
