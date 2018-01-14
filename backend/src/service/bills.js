"use strict";
const bills = require('../models').bills;

exports.list = function (req, res) {
  bills.findAll().then(bills => {
    res.jsonp(bills);
  }).catch((error) => res.status(400).send(error));
};

exports.create = function (req, res) {
    console.log(JSON.stringify(req.body))
  res.jsonp(bills.create(req.body));
};

exports.findById = function (req, res) {
  let id = req.params.id;
  bills.findById(id).then(bills => {
    if (!bills) {
      return res.status(400).send({
        message: 'Bill Not Found',
      });
    }
    res.jsonp(bills);
  });
};

exports.delete = function (req, res) {
  let id = req.params.id;
  bills.findById(req.params.id)
    .then(bills => {
      if (!bills) {
        return res.status(400).send({
          message: 'Bill Not Found',
        });
      }
      return bills
      .destroy()
      .then(() => res.status(204).send())
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
};

exports.update = function (req, res) {
  let id = req.params.id;
  bills.findById(id).then(bills => {
    if (!bills) {
      return res.status(400).send({
        message: 'Bill Not Found',
      });
    }
    bills.id_employee = req.body.id_employee; 
    bills.id_client = req.body.id_client; 
    bills.date = req.body.date; 
    bills.amout = req.body.amout;     

    bills.save(function(err) {
      if (err)
          res.send(err);

      res.json({ message: 'Bill was updated!' });
    });
  });
};