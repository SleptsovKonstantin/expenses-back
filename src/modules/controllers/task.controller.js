const Buys = require("../../db/modules/task/index");

module.exports.getAllTicket = (req, res) => {
  Buys.find().then((result) => {
    res.send({ data: result });
  });
};

module.exports.createTicket = (req, res) => {
  const ticket = new Buys(req.body);
  ticket.save().then((result) => {
    Buys.find().then((result) => {
      res.send({ data: result });
    });
  });
};

module.exports.changeTicket = (req, res) => {
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
};

module.exports.deleteTicket = (req, res) => {
  const id = req.query._id;
  if (id) {
    Buys.deleteOne({ _id: id }).then(() => {
      Buys.find().then((result) => {
        res.send({ data: result });
      });
    });
  } else {
    res.status(422).send("Error! Params not correct");
  }
};