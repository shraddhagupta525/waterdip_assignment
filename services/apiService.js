import { csvParse } from "d3-dsv";

const url = "/hotel_bookings.csv";

async function fetchBookingData(startDate, endDate) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const text = await response.text();

    const data = csvParse(text);

    const monthMapping = {
      January: 0,
      February: 1,
      March: 2,
      April: 3,
      May: 4,
      June: 5,
      July: 6,
      August: 7,
      September: 8,
      October: 9,
      November: 10,
      December: 11,
    };

    const filteredData = data.filter((booking) => {
      const checkInDate = new Date(
        booking.arrival_date_year,
        monthMapping[booking.arrival_date_month],
        booking.arrival_date_day_of_month
      );

      return (
        checkInDate >= new Date(startDate) && checkInDate <= new Date(endDate)
      );
    });

    return filteredData;
  } catch (error) {
    console.error("Error fetching booking data:", error);
    return [];
  }
}

export { fetchBookingData };