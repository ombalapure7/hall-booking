const express = require("express");
const app = express();
require("dotenv").config();

// Room router
const rooms = require("./routes/rooms");
// Booking router
const bookings = require("./routes/bookings");

app.use(express.json());
const PORT = process.env.PORT || 5000;

/* ======================================================== */
/* HOME PAGE */
/* ======================================================== */
app.get("/", (req, res) => {
  res.send(`<h1>Hall Booking API</h1>
    <dl style="font-size: 18px">
      <dt><b>Room Endpoint</b></dt>
      <dd>Get all rooms: /api/v1/rooms (GET)</dd>
      <dd>Delete a room: /api/v1/rooms/:id (DELETE)</dd>
      <dd>Create a room: /api/v1/rooms (POST)</dd>
    </dl>
    <dl style="font-size: 18px">
      <dt><b>Booking Endpoint</b></dt>
      <dd>Get all bookings: /api/v1/bookings (GET)</dd>
      <dd>Get a booking: /api/v1/bookings/:id (GET)</dd>
      <dd>Create a booking: /api/v1/bookings (POST)</dd>
    </dl>
  `);
});

/* ======================================================== */
/* ROOM ENDPOINTS */
/* ======================================================== */
app.use("/api/v1/rooms", rooms);

/* ======================================================== */
/* BOOKING ENDPOINTS */
/* ======================================================== */
app.use("/api/v1/bookings", bookings);

/* ======================================================== */
/* SERVER */
/* ======================================================== */
app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
