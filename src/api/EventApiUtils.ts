import {OrgEvent} from "./types";

const basePath = "http://127.0.0.1:8080";

export const fetchOrganizationEvents = async (
  organizationId: number,
): Promise<OrgEvent[]> => {
  // try {
  //   const response = await fetch(basePath + `/organizations/${organizationId}/events`);
  //   const data = await response.json();
  //   return data;
  // } catch (error) {
  //   console.log("Error fetching events:", error);
  //   throw error;
  // }
  return [
    {
      id: 0,
      imageUrl: "https://images.ctfassets.net/hvenzvkwiy9m/6vvcu0fN9x6damaH2chW1A/b7a014b13b6e355ccce4196712a5b2b4/bit-logo-black.jpg",
      name: "Test 1",
      description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      startDate: new Date(),
      endDate: new Date(),
      location: "AGH D17 1.38",
      organizationName: "Akademia Gorniczo Hutnicza",
      lastEdit: new Date(),
    },
    {
      id: 1,
      imageUrl: "https://images.ctfassets.net/hvenzvkwiy9m/6vvcu0fN9x6damaH2chW1A/b7a014b13b6e355ccce4196712a5b2b4/bit-logo-black.jpg",
      name: "Test 2",
      description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      startDate: new Date(),
      endDate: new Date(),
      location: "AGH D17 1.38",
      organizationName: "Akademia Gorniczo Hutnicza",
      lastEdit: new Date(),
    }
  ]
};

export const fetchEventDetails = async (
  eventId: number,
): Promise<OrgEvent> => {
  // try {
  //   const response = await fetch(basePath + `/events/${eventId}`);
  //   const data = await response.json();
  //   return data;
  // } catch (error) {
  //   console.log("Error fetching organizations:", error);
  //   throw error;
  // }

  return [
    {
      id: 0,
      imageUrl: "https://images.ctfassets.net/hvenzvkwiy9m/6vvcu0fN9x6damaH2chW1A/b7a014b13b6e355ccce4196712a5b2b4/bit-logo-black.jpg",
      name: "Test 1",
      description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      startDate: new Date(),
      endDate: new Date(),
      location: "AGH D17 1.38",
      organizationName: "Akademia Gorniczo Hutnicza",
      lastEdit: new Date(),
    },
    {
      id: 1,
      imageUrl: "https://images.ctfassets.net/hvenzvkwiy9m/6vvcu0fN9x6damaH2chW1A/b7a014b13b6e355ccce4196712a5b2b4/bit-logo-black.jpg",
      name: "Test 2",
      description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      startDate: new Date(),
      endDate: new Date(),
      location: "AGH D17 1.38",
      organizationName: "Akademia Gorniczo Hutnicza",
      lastEdit: new Date(),
    }
  ][eventId]
};

