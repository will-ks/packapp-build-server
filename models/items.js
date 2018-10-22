const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const itemSchema = new Schema({
  name: String,
  image: String,
  owner: { type: ObjectId, ref: 'User' }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
