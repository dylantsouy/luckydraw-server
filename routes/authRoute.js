const { Router } = require('express');
const router = Router();
const UserControllers = require('../controllers/user');
const RewardControllers = require('../controllers/reward');
const WinningControllers = require('../controllers/winning');
const uploadExcel = require('../middlewares/uploadExcel');
const uploadImage = require('../middlewares/uploadImage');

router
    .get('/users', UserControllers.getAllUsers)
    .get('/users/:id', UserControllers.getUserById)
    .post('/users', UserControllers.createUser)
    .post('/users/uploadUser', uploadExcel.single('file'), UserControllers.uploadUser)
    .put('/users/:id', UserControllers.updateUser)
    .delete('/users/:id', UserControllers.deleteUser)
    .post('/users/deleteUsers', UserControllers.deleteUsers)
    .post('/users/deleteAll', UserControllers.deleteAllUser);

router
    .get('/rewards', RewardControllers.getAllRewards)
    .get('/rewards/:id', RewardControllers.getRewardById)
    .post('/rewards', uploadImage.single('file'), RewardControllers.uploadReward)
    .delete('/rewards/:id', RewardControllers.deleteReward)
    .post('/rewards/deleteRewards', RewardControllers.deleteRewards)
    .post('/rewards/deleteAll', RewardControllers.deleteAllReward);

router
    .get('/winnings', WinningControllers.getAllWinnings)
    .delete('/winnings/:id', WinningControllers.deleteWinning)
    .post('/winnings/deleteWinnings', WinningControllers.deleteWinnings)
    .post('/winnings/deleteAll', WinningControllers.deleteAllWinning);

module.exports = router;
