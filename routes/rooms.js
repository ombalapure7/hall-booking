const express = require("express");
const router = express.Router();

const { createRoom, getAllRooms, deleteRoom } = require("../controllers/rooms");

router.route("/").get(getAllRooms).post(createRoom);
router.route("/:id").delete(deleteRoom);

module.exports = router;
