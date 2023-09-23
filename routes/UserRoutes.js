const router = require('express').Router();

const UserController = require('../controllers/UserController');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/getuser', UserController.getUser);
router.get('/:id', UserController.getUserById);
router.patch('/edit/:id', UserController.editUser);
router.post('/:id/favorites', UserController.addToFavorites);
router.delete('/:id/favorites/:productId', UserController.removeFromFavorites);

module.exports = router;
