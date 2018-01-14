"use strict";
const departments = require('../models').departments;

exports.list = function (req, res) {
  departments.findAll().then(departments => {
    res.jsonp(departments);
  }).catch((error) => res.status(400).send(error));
};

exports.create = function (req, res) {
  res.jsonp(departments.create(req.body));
};

exports.findById = function (req, res) {
  let id = req.params.id;
  departments.findById(id).then(departments => {
    if (!departments) {
      return res.status(400).send({
        message: 'Department Not Found',
      });
    }
    res.jsonp(departments);
  });
};

exports.delete = function (req, res) {
  let id = req.params.id;
  departments.findById(req.params.id)
    .then(departments => {
      if (!departments) {
        return res.status(400).send({
          message: 'Department Not Found',
        });
      }
      return departments
      .destroy()
      .then(() => res.status(204).send())
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
};

exports.update = function (req, res) {
  let id = req.params.id;
  departments.findById(id).then(departments => {
    if (!departments) {
      return res.status(400).send({
        message: 'Department Not Found',
      });
    }
    departments.name = req.body.name; 
    departments.save(function(err) {
      if (err)
          res.send(err);

      res.json({ message: 'Department was updated!' });
    });
  });
};