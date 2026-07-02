const BASE_FARE = 50;

const PRICE_PER_KM = 15;

const PRICE_PER_MINUTE = 2;

export const calculateFare = (
    distanceInMeters:number,
    durationInSeconds:number
)=>{

    const distanceKm = distanceInMeters / 1000;

    const durationMinutes = durationInSeconds / 60;

    const fare =
        BASE_FARE +
        distanceKm * PRICE_PER_KM +
        durationMinutes * PRICE_PER_MINUTE;

    return Math.round(fare);

}