const { Router } = require('express');
const router = Router();
const AdminControllers = require('../controllers/admin');
const WinningControllers = require('../controllers/winning');

router.post('/signup', AdminControllers.signup).post('/signin', AdminControllers.signin);

router
    .post('/winnings', WinningControllers.createWinning);

module.exports = router;
