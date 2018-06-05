"use strict";

const users = require('../models').users;

exports.list = function (req, res) {
  users.findAll().then(user => {
    res.jsonp(user);
  }).catch((error) => res.status(400).send(error));
};

exports.create = function (req, res) {
  res.jsonp(users.create(req.body));
};

exports.findById = function (req, res) {
  let id = req.params.id;
  users.findById(id).then(user => {
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
  users.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(400).send({
          message: 'User Not Found',
        });
      }
      return user
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
};