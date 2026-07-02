import axios from "axios";

export const getDistanceAndDuration = async (
  originLat: number,
  originLng: number,
  destinationLat: number,
  destinationLng: number
) => {
  const url = `https://router.project-osrm.org/route/v1/driving/${originLng},${originLat};${destinationLng},${destinationLat}?overview=false`;

  const response = await axios.get(url);

  if (!response.data.routes?.length) {
    throw new Error("Route not found");
  }

  const route = response.data.routes[0];

  return {
    distanceInMeters: route.distance,
    durationInSeconds: route.duration,
  };
};