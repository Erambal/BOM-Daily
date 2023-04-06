// @ts-ignore
const express = require('express');
// @ts-ignore
const router = express.Router();
const user_favorite = require('../controllers/user_favorites');

router.get('/', user_favorite.getAllFavorites);
router.get('/:id', user_favorite.getFavoriteById);
router.post('/', user_favorite.createFavorite);
router.put('/:id', user_favorite.updateFavorite);
router.delete('/:id', user_favorite.deleteFavorite);

module.exports = router;