"use strict";
const rooms = require('../models').rooms;

exports.list = function (req, res) {
  rooms.findAll().then(rooms => {
    res.jsonp(rooms);
  }).catch((error) => res.status(400).send(error));
};

exports.create = function (req, res) {
    console.log(JSON.stringify(req.body))
  res.jsonp(rooms.create(req.body));
};

exports.findById = function (req, res) {
  let id = req.params.id;
  rooms.findById(id).then(rooms => {
    if (!rooms) {
      return res.status(400).send({
        message: 'Room Not Found',
      });
    }
    res.jsonp(rooms);
  });
};

exports.delete = function (req, res) {
  let id = req.params.id;
  rooms.findById(req.params.id)
    .then(rooms => {
      if (!rooms) {
        return res.status(400).send({
          message: 'Room Not Found',
        });
      }
      return rooms
      .destroy()
      .then(() => res.status(204).send())
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
};

exports.update = function (req, res) {
  let id = req.params.id;
  rooms.findById(id).then(rooms => {
    if (!rooms) {
      return res.status(400).send({
        message: 'Room Not Found',
      });
    }
    rooms.roomType = req.body.roomType; 
    rooms.nrAdults = req.body.nrAdults; 
    rooms.nrChildrens = req.body.nrChildrens; 
    rooms.priceNight = req.body.priceNight;     

    rooms.save(function(err) {
      if (err)
          res.send(err);

      res.json({ message: 'Room was updated!' });
    });
  });
};