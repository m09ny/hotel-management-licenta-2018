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
  let userName = req.params.userName;
  let password = req.params.password;
  admins.findAll().then(admin => {
    if (admin.userName === userName && admin.password === password) {
      res.jsonp(admin);
    }
  }).catch((error) => res.status(400).send(error));
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