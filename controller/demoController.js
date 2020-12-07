const select = require("../models/select");
const create = require("../models/create");
const update = require("../models/update");
const deleteUser = require("../models/delete");

exports.create = async (req, res, next) => {
  if (req.body.firstname && req.body.lastname) {
    create.insert(req.body, (data) => {
      console.log(data);
      res.send(data);
    });
  }
};

exports.createMany = async (req, res, next) => {
  create.insertMany(req.body, (data) => {
    console.log(data);
    res.send(data);
  });
};

exports.select = async (req, res, next) => {
  select.run((data) => {
    res.send(data.rows);
  });
};

exports.update = async (req, res, next) => {
  if (req.body.newname && req.body.firstname) {
    update.update(req.body, (data) => {
      console.log(data);
      res.send(data);
    });
  } else {
    res.send("Data not sufficient");
  }
};

exports.delete = async (req, res, next) => {
  if (req.body.id) {
    deleteUser.run(req.body, (data) => {
      res.send(data);
    });
  }
};
