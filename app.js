const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const port = 4000;

app.use(cors());

const { Schema } = mongoose;

const oneBuy = new Schema({
  shop: String,
  date: String,
  sum: String,
});

const Buys = mongoose.model("buy", oneBuy);

const uri =
  "mongodb+srv://SleptsovKonstantin:sleptsov123321@cluster0.omltj.mongodb.net/Todolist?retryWrites=true&w=majority";
mongoose.connect(uri);

app.use(express.json());

app.get("/allBuy", (req, res) => {
  Buys.find().then((result) => {
    res.send({ data: result });
  });
});

app.post("/createTicket", (req, res) => {
  const ticket = new Buys(req.body);
  console.log(ticket);
  ticket.save().then((result) => {
    Buys.find().then((result) => {
      res.send({ data: result });
    });
  });
});

app.delete("/deleteTicket", (req, res) => {
  const id = req.query._id;
  console.log(id);
  if (id) {
    Buys.deleteOne({ _id: id }).then(() => {
      Buys.find().then((result) => {
        res.send({ data: result });
      });
    });
  } else {
    res.status(422).send("Error! Params not correct");
  }
});

app.patch('/updateTicket', (req, res) => {
  const body = req.body;
  const { _id } = body;
  console.log(body);
  if (
    body.hasOwnProperty("_id") &&
    (body.hasOwnProperty("shop") || body.hasOwnProperty("date") || body.hasOwnProperty("sum"))
  ) {
    Buys.updateOne({ _id: _id }, body).then(() => {
      Buys.find().then((result) => {
        res.send({ data: result });
      });
    });
  } else {
    res.status(422).send("Error! Params not correct");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});





