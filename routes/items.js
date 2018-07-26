const express = require('express');
const router = express.Router();

const Item = require('../models/items');

router.get('/', (req, res, next) => {
  Item.find()
    .then(result => {
      res.json([]);
    })
    .catch(next);
});

module.exports = router;
