const fs = require("fs");
const path = require("path");
const files = path.join(__dirname, "../data");

/**
 * @desc Create a booking
 * @request POST
 * @endpoint /api/v1/bookings
 */
const createBooking = async (req, res) => {
  try {
    fs.readFile(`${files}/rooms.json`, "utf8", (err, data) => {
      const hallId = req.body.hall;

      // Get the particular hall
      const tempRooms = JSON.parse(data);
      const hall = tempRooms.find((room) => {
        if (room.id == hallId) {
          room.booked = true;
          return room;
        }
      });

      // Calcuate cost
      const startDate = new Date(req.body.start);
      const endDate = new Date(req.body.end);
      const cost = hall.price * (endDate.getHours() - startDate.getHours());

      const updatedRooms = tempRooms.filter((room) => room.id != hallId);
      hall.booked = true;
      hall.start = startDate;
      hall.end = endDate;

      updatedRooms.push(hall);
      fs.writeFile(
        `${files}/rooms.json`,
        JSON.stringify(updatedRooms),
        (err, data) => {
          if (err) {
            throw err;
          }
        }
      );

      // Push object to the JSON file
      fs.readFile(`${files}/bookings.json`, "utf8", (err, data) => {
        let bookings = JSON.parse(data);

        // Create booking object
        const booking = {
          id: new Date().getTime().toString(),
          name: req.body.name,
          date: req.body.date,
          start: startDate,
          end: endDate,
          hallDetails: hall,
          cost: cost,
        };

        bookings.push(booking);

        fs.writeFile(
          `${files}/bookings.json`,
          JSON.stringify(bookings),
          (err, data) => {
            if (err) {
              throw err;
            }
          }
        );
      });
    });
  } catch (err) {
    return res.status(500).json({
      booking: "Something went wrong while booking the hall",
      status: "failure",
    });
  }

  res.status(201).json({
    booking: "Booking created",
    status: "success",
  });
};

/**
 * @desc Get all bookings
 * @request GET
 * @endpoint /api/v1/bookings
 */
const getAllBookings = async (req, res) => {
  try {
    fs.readFile(`${files}/bookings.json`, "utf8", (err, data) => {
      const bookings = JSON.parse(data);

      res.status(200).json({
        bookings,
        status: "success",
        length: bookings.length,
      });
    });
  } catch (error) {
    return res.status(500).json({
      booking: "Something went wrong while fetching all the bookings",
      status: "failure",
    });
  }
};

/**
 * @desc Get a booking
 * @request GET
 * @endpoint /api/v1/bookings/:id
 */
 const getABooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    fs.readFile(`${files}/bookings.json`, "utf8", (err, data) => {
      let bookings = JSON.parse(data);
      bookings = bookings.find((room) => room.id == bookingId);

      res.status(200).json({
        booking: bookings,
        status: "success"
      });
    });
  } catch (error) {
    return res.status(500).json({
      booking: "Something went wrong while fetching all the bookings",
      status: "failure",
    });
  }
};


module.exports = { getAllBookings, getABooking, createBooking };
