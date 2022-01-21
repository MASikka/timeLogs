const express = require('express');
const mainController = require('../controllers/mainController');
const router = express.Router();

router.get('/',mainController.getMainPage);
router.get('/register',mainController.getRegisterPage);
router.get('/login',mainController.getLoginPage);
router.post('/register',mainController.postRegister);
router.post('/login', mainController.postLogin);
router.get('/logs', mainController.getLogs);
router.get('/logout',mainController.getLogout);

module.exports = router;