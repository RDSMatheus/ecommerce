const Product = require('../models/Product');

module.exports = class ProductController {
  static async getProducts(req, res) {
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 16;

    try {
      const products = await Product.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro na busca de produtos' });
    }
  }

  static async registerProducts(req, res) {
    const { productName, productDescription, price } = req.body;

    try {
      const product = new Product({
        productName,
        productDescription,
        price,
      });

      await product.save();
      res.status(201).json({ message: 'Produto criado com sucesso', product });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar o produto' });
    }
  }

  static async getProductsById(req, res) {
    const { id } = req.params;

    try {
      const product = await Product.findById(id);

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Produto não encontrado!' });
    }
  }
};
