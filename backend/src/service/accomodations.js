"use strict";

const accomodations = require('../models').accomodations;

exports.list = function (req, res) {
  accomodations.findAll().then(accomodations => {
    res.jsonp(accomodations);
  }).catch((error) => res.status(400).send(error));
};

exports.create = function (req, res) {
  res.jsonp(accomodations.create(req.body));
};

exports.findById = function (req, res) {
  let id = req.params.id;
  accomodations.findById(id).then(accomodations => {
    if (!accomodations) {
      return res.status(400).send({
        message: 'Accomodation Not Found',
      });
    }
    res.jsonp(accomodations);
  });
};

exports.delete = function (req, res) {
  let id = req.params.id;
  accomodations.findById(req.params.id)
    .then(accomodations => {
      if (!accomodations) {
        return res.status(400).send({
          message: 'Accomodation Not Found',
        });
      }
      return accomodations
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
};

exports.update = function (req, res) {
  let id = req.params.id;
  accomodations.findById(id).then(accomodations => {
    if (!accomodations) {
      return res.status(400).send({
        message: 'Accomodation Not Found',
      });
    }
    accomodations.id_employee = req.body.id_employee; 
    accomodations.id_bill = req.body.id_bill;
    accomodations.id_room = req.body.id_room;
    accomodations.arrivelDate = req.body.arrivelDate;
    accomodations.nrNights = req.body.nrNights;
    accomodations.nrAdults = req.body.nrAdults;
    accomodations.nrChildrens = req.body.nrChildrens;

    accomodations.save(function(err) {
      if (err)
          res.send(err);

      res.json({ message: 'Accomodation was updated!' });
    });
  });
};