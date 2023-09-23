const jwt = require('jsonwebtoken');

const User = require('../models/User');

const getUserByToken = async (token) => {
  if (!token) {
    res.status(401).json({ message: 'Acesso negado!' });
  }

  const decoded = jwt.verify(token, 'jwtsecretettoken');

  const userId = decoded.id;

  const user = await User.findById(userId);

  return user;
};

module.exports = getUserByToken;
