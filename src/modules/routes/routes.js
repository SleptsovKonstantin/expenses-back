const express = require("express");
const router = express.Router();

const {
  getAllTicket,
  createTicket,
  changeTicket,
  deleteTicket
} = require("../controllers/task.controller");

// Task routes
router.get("/allBuy", getAllTicket);
router.post("/createTicket", createTicket);
router.patch("/updateTicket", changeTicket);
router.delete("/deleteTicket", deleteTicket);

//User routes
module.exports = router;