"use strict";

const admins = require('../models').admins;

exports.list = function (req, res) {
  admins.findAll().then(admin => {
    res.jsonp(admin);
  }).catch((error) => res.status(400).send(error));
};

exports.create = function (req, res) {
  res.jsonp(admins.create(req.body));
};

exports.login = function (req, res) {
  let userName = req.body.userName;
  let password = req.body.password
  admins.findAll()
    .then(admins => {
      let found = false;
      for (let i = 0, n = admins.length; i < n; i++) {
        let admin = admins[i].dataValues;
        found = admin.userName === userName && admin.password === password;
        if (found) {
          res.jsonp(admin);
          break;
        }
      }
      console.log("found:" + found);
      if (!found) {
        res.status(404);
        res.jsonp({"message": "User not found!"});
      }
    })
    .catch((error) => res.status(400)
    .send(error));
};

exports.findById = function (req, res) {
  let id = req.params.id;
  admins.findById(id).then(user => {
    if (!user) {
      return res.status(400).send({
        message: 'User Not Found',
      });
    }
    res.jsonp(user);
  });
};

exports.delete = function (req, res) {
  let id = req.params.id;
  admins.findById(req.params.id)
    .then(admin => {
      if (!admin) {
        return res.status(400).send({
          message: 'User Not Found',
        });
      }
      return admin
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
};