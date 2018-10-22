const ObjectId = require('mongoose').Types.ObjectId;

function isIdValid (req, res, next) {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ code: 'invalid-object' });
  }
  next();
}

module.exports = isIdValid;
