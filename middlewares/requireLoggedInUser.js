'use strict';

function requireLoggedInUser (req, res, next) {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'Unauthorized' });
  }
  next();
}

module.exports = requireLoggedInUser;
