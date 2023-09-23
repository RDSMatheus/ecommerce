const mongoose = require('../db/conn');
const { Schema } = mongoose;

const User = mongoose.model(
  'User',
  new Schema(
    {
      fullName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
      },
      password: {
        type: String,
        require: true,
      },
      image: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      adress: {
        type: String,
      },
      favoriteProducts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
      ],
    },
    {
      timestamps: true,
    },
  ),
);

module.exports = User;
