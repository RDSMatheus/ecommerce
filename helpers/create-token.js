const jwt = require('jsonwebtoken');

const createToken = async (user, req, res) => {
  const token = jwt.sign(
    {
      name: user.name,
      id: user.id,
    },
    'jwtsecretettoken',
  );

  res.status(200).json({
    message: 'Você está autenticado',
    token,
  });
};

module.exports = createToken;
