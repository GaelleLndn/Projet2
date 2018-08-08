const express = require('express');
const router = express.Router();

const SearchController = require('../controllers/searchController');

router.get('/:term', SearchController.text_search);


module.exports = router