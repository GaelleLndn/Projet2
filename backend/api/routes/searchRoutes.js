const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth')

const SearchController = require('../controllers/searchController');



router.get('/:term', checkAuth, SearchController.text_search);


module.exports = router