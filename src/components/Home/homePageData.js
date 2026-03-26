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

const fetchWithTimeout = async (url, options = {}, timeout = 10000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error(`Request timeout after ${timeout}ms`);
    }
    throw error;
  }
};

const loadHomePageData = async () => {
  const results = await Promise.allSettled([
    fetchWithTimeout("/api/messages", {}, 15000).then((response) =>
      parseJson(response, (data) => data.data || []),
    ),
    fetchWithTimeout("/api/events", {}, 15000).then((response) =>
      parseJson(response, (data) => data || []),
    ),
    fetchWithTimeout("/api/testimonial", {}, 15000).then((response) =>
      parseJson(response, (data) => data.data || []),
    ),
    fetchWithTimeout("/api/notice?page=1&limit=6", {}, 15000).then((response) =>
      parseJson(response, (data) => data.docs || []),
    ),
  ]);

  const [messages, events, testimonials, notices] = results.map(
    (result, index) => {
      if (result.status === "fulfilled") {
        return result.value;
      }

      const sectionNames = ["messages", "events", "testimonials", "notices"];
      console.warn(
        `Failed to load ${sectionNames[index]}:`,
        result.reason?.message || result.reason,
      );
      return emptyHomePageData[sectionNames[index]];
    },
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
