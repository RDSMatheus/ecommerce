const User = require('../models/User');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = require('../helpers/create-token');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');
const Product = require('../models/Product');

module.exports = class UserController {
  static async register(req, res) {
    const { fullName, email, password, confirmPassword } = req.body;

    if (!fullName) {
      res.status(422).json({ message: 'O nome é obrigatório!' });
      return;
    }

    if (!email) {
      res.status(422).json({ message: 'O email é obrigatório!' });
      return;
    }

    if (!password) {
      res.status(422).json({ message: 'Senha é obrigatória!' });
      return;
    }

    if (!confirmPassword) {
      res
        .status(422)
        .json({ message: 'A confirmação da senha é obrigatória!' });
      return;
    }

    if (password !== confirmPassword) {
      res.status(422).json({
        message: 'A confirmação da senha e a senha não correspondem!',
      });
      return;
    }

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      res.status(422).json({ message: 'Email já cadastrado!' });
      return;
    }

    const salt = await bcrypt.genSalt(13);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      fullName,
      email,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();
      await createToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: 'O email é obrigatório!' });
      return;
    }

    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatória!' });
      return;
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(422).json({
        message: 'Não há usuários cadastrados com esse email!',
      });
      return;
    }

    await createToken(user, req, res);
  }

  static async getUser(req, res) {
    let currentUser;

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, 'jwtsecretettoken');

      currentUser = await User.findById(decoded.id);
      currentUser.password = null;
    } else {
      currentUser = null;
    }

    res.status(200).json(currentUser);
  }

  static async getUserById(req, res) {
    const token = getToken(req);
    const user = getUserByToken(token);

    if (!user) {
      res.status(422).json({
        message: 'Usuário não encontrado!',
      });
      return;
    }

    res.status(200).json({ user });
  }

  static async editUser(req, res) {
    const { id } = req.body;

    const user = await User.findById(id);

    const { fullName, password, email, city, adress, state } = req.body;

    if (req.file) {
      user.image = req.file;
    }

    if (!fullName) {
      res.status(422).json({ message: 'O nome é obrigatório!' });
      return;
    }

    user.fullName = fullName;

    if (!phone) {
      res.status(422).json({ message: 'O telefone é obrigatório' });
      return;
    }

    user.phone = phone;

    if (user.email !== email && userExists) {
      res.status(422).json({
        message: 'Usuário não encontrado!',
      });
      return;
    }

    user.email = email;

    if (!password) {
      res.status(422).json({ message: 'Senha é obrigatória!' });
      return;
    }

    if (!confirmPassword) {
      res
        .status(422)
        .json({ message: 'A confirmação da senha é obrigatória!' });
      return;
    }

    if (password !== confirmPassword) {
      res.status(422).json({
        message: 'A confirmação da senha e a senha não correspondem!',
      });
      return;
    } else if (password === confirmPassword && password != null) {
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      user.password = passwordHash;
    }

    try {
      await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true },
      );

      res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
    } catch (error) {
      res.status(500).json({ message: err });
      return;
    }
  }

  static async addToFavorites(req, res) {
    const { id } = req.params;
    const { productId } = req.body;

    try {
      const user = await User.findById(id);

      console.log(user);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      if (!user.favoriteProducts.includes(productId)) {
        user.favoriteProducts.push(productId);
      }

      const product = await Product.findById(productId);
      console.log(product);

      await user.save();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

    return res
      .status(200)
      .json({ message: 'Produto adicionado aos favoritos com sucesso' });
  }

  static async removeFromFavorites(req, res) {
    const { id, productId } = req.body;

    try {
      const user = await User.findOne({ id: id });

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      user.favoriteProducts = user.favoriteProducts.filter(
        (product) => product !== productId,
      );

      user.save();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
