const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth')

const LogsController = require('../controllers/logsController');


// GET on localhost:800/logs
//router.get('/', checkAuth, LogsController.logs_get_all);
router.get('/', LogsController.logs_get_all);

// POST on localhost:800/logs
router.post('/', LogsController.logs_create_log);

// GET on localhost:800/logs/id
router.get('/:logId', LogsController.logs_get_log_by_id);

// PATCH on localhost:800/logs/id
router.patch('/:logId', LogsController.logs_update_log_by_id);

// DELETE on localhost:800/logs/id
router.delete('/:logId', LogsController.logs_delete_log_by_id);

module.exports = router