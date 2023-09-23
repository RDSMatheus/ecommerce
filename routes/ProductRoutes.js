const router = require('express').Router();

const ProductController = require('../controllers/ProductController');

router.get('/', ProductController.getProducts);
router.post('/', ProductController.registerProducts);
router.get('/:id', ProductController.getProductsById);

module.exports = router;
