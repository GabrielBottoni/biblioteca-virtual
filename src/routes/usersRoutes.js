const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const authorizeRoles = require('../middlewares/role.middleware');

router.get('/admin', verifyToken, authorizeRoles("admin"), usersController.getAllUsers);
router.put('/admin/:id/toggle-role', verifyToken, authorizeRoles("admin"), usersController.toggleUserRole);


router.post('/', usersController.createUser);

module.exports = router;