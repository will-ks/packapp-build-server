const Item = require('../models/items');

function isUserOwner (req, res, next) {
  Item.findById(req.params.id, { owner: 1, _id: 0 }).then(result => {
    if (result.owner.toString() === req.session.currentUser._id) {
      next();
    }
  });
}

module.exports = isUserOwner;
