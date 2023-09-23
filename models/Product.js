const mongoose = require('../db/conn');
const { Schema } = mongoose;

const Product = mongoose.model(
  'Product',
  new Schema(
    {
      productName: {
        type: String,
        required: true,
      },
      productDescription: {
        type: String,
        required: true,
      },
      productImage: {
        type: String,
      },
      price: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    },
  ),
);

module.exports = Product;
