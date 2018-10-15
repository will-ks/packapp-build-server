const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Item = require('../models/items');

// Example GETs
router.get('/', (req, res, next) => {
  Item.find()
    .then(result => {
      return res.json(result);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next();
  };

  Item.findById(req.params.id)
    .then(result => {
      if (!result) {
        return next();
      }
      return res.json(result);
    })
    .catch(next);
});

// Example POST
router.post('/', (req, res, next) => {
  if (!req.body.name || !req.body.image) {
    return res.status(422).json({ code: 'incorrect parameters' });
  };

  const data = req.body;
  const newItem = new Item(data);
  newItem.save()
    .then(result => {
      return res.json(result);
    })
    .catch(next);
});

// Example PUT
router.put('/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next();
  };

  if (!req.body.name && !req.body.image) {
    return res.status(422).json({ code: 'incorrect parameters' });
  };

  const data = req.body;
  Item.findByIdAndUpdate(req.params.id, data, { new: true })
    .then(result => {
      if (!result) {
        return next();
      }
      return res.json(result);
    })
    .catch(next);
});

module.exports = router;
