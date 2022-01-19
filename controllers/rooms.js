const fs = require("fs");
const path = require("path");
const roomDir = path.join(__dirname, "../data");

/**
 * @desc Create a room
 * @request POST
 * @endpoint /api/v1/rooms
 */
const createRoom = async (req, res) => {
  const room = {
    id: new Date().getTime().toString(),
    name: req.body.name,
    seats: req.body.seats,
    aminities: req.body.aminities,
    price: req.body.price,
    booked: req.body.booked,
    start: "",
    end: "",
  };

  try {
    fs.readFile(`${roomDir}/rooms.json`, (err, data) => {
      const tempRooms = JSON.parse(data);
      tempRooms.push(room);

      fs.writeFile(
        `${roomDir}/rooms.json`,
        JSON.stringify(tempRooms),
        (err, data) => {
          if (err) {
            throw err;
          }
        }
      );

      res.status(201).json({
        msg: `Room with ${room.id} created!`,
        status: "success",
      });
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Something went wrong while creating room!",
      status: "failure",
    });
  }
};

/**
 * @desc Get all rooms
 * @request GET
 * @endpoint /api/v1/rooms
 */
const getAllRooms = async (req, res) => {
  let rooms = [];

  try {
    fs.readFile(`${roomDir}/rooms.json`, "utf8", (err, data) => {
      if (err) throw err;

      rooms = JSON.parse(data);
      res.status(200).json({
        rooms,
        status: "success",
        length: rooms.length,
      });
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Something went wrong while getting all rooms!",
      status: "failure",
    });
  }
};

/**
 * @desc Delete a room
 * @request DELETE
 * @endpoint /api/v1/rooms/:id
 */
const deleteRoom = async (req, res) => {
  const id = req.params.id;

  try {
    fs.readFile(`${roomDir}/rooms.json`, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      let tempRooms = JSON.parse(data);
      tempRooms = tempRooms.filter((room) => room.id != id);

      fs.writeFile(
        `${roomDir}/rooms.json`,
        JSON.stringify(tempRooms),
        (err, data) => {
          if (err) {
            throw err;
          }
        }
      );

      res.status(204).json({
        msg: `Room with ${id} was deleted!`,
        status: "success",
      });
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Something went wrong while creating room!",
      status: "failure",
    });
  }
};

module.exports = { getAllRooms, createRoom, deleteRoom };
