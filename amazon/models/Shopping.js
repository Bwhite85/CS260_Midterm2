var mongoose = require('mongoose');
var ShoppingSchema = new mongoose.Schema({
  Name: String,
  timesPurchased: { type: Number, default: 0 },
  price: {type: Number, default: 0},
  image: String,
});

ShoppingSchema.methods.purchase = function(cb) {
  this.timesPurchased += 1;
  this.save(cb);
};

mongoose.model('Shopping', ShoppingSchema);