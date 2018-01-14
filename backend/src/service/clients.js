"use strict";

const clients = require('../models').clients;

exports.list = function (req, res) {
  clients.findAll().then(clients => {
    res.jsonp(clients);
  }).catch((error) => res.status(400).send(error));
};

exports.create = function (req, res) {
  res.jsonp(clients.create(req.body));
};

exports.findById = function (req, res) {
  let id = req.params.id;
  clients.findById(id).then(clients => {
    if (!clients) {
      return res.status(400).send({
        message: 'Client Not Found',
      });
    }
    res.jsonp(clients);
  });
};

exports.delete = function (req, res) {
  let id = req.params.id;
  clients.findById(req.params.id)
    .then(clients => {
      if (!clients) {
        return res.status(400).send({
          message: 'Client Not Found',
        });
      }
      return clients
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
};

exports.update = function (req, res) {
  let id = req.params.id;
  clients.findById(id).then(clients => {
    if (!clients) {
      return res.status(400).send({
        message: 'Client Not Found',
      });
    } 
    clients.firstName = req.body.firstName ;
    clients.lastName = req.body.lastName ;
    clients.cnp = req.body.cnp ;
    clients.address = req.body.address ;
    clients.phone = req.body.phone ;
    clients.email = req.body.email ;
    clients.createdAt= req.body.createdAt ;
    clients.updatedAt = req.body.updatedAt ;

    clients.save(function(err) {
      if (err)
          res.send(err);

      res.json({ message: 'Client was updated!' });
    });
  });
};