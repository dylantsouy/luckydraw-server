const { Router } = require('express');
const router = Router();
const UserControllers = require('../controllers/user');
const RewardControllers = require('../controllers/reward');
const WinningControllers = require('../controllers/winning');
const AdminControllers = require('../controllers/admin');
const uploadExcel = require('../middlewares/uploadExcel');
const uploadImage = require('../middlewares/uploadImage');
const verifyToken = require('../middlewares/authJwt')

router
    .get('/users', [verifyToken], UserControllers.getAllUsers)
    .get('/users/:id', [verifyToken], UserControllers.getUserById)
    .post('/users', [verifyToken], UserControllers.createUser)
    .post('/users/uploadUser', [verifyToken], uploadExcel.single('file'), UserControllers.uploadUser)
    .put('/users/:id', [verifyToken], UserControllers.updateUser)
    .delete('/users/:id', [verifyToken], UserControllers.deleteUser)
    .post('/users/deleteUsers', [verifyToken], UserControllers.deleteUsers)
    .post('/users/deleteAll', [verifyToken], UserControllers.deleteAllUser);

router
    .get('/rewards', [verifyToken], RewardControllers.getAllRewards)
    .get('/rewards/:id', [verifyToken], RewardControllers.getRewardById)
    .post('/rewards', [verifyToken], uploadImage.single('file'), RewardControllers.uploadReward)
    .delete('/rewards/:id', [verifyToken], RewardControllers.deleteReward)
    .put('/rewards/:id', [verifyToken], RewardControllers.updateReward)
    .post('/rewards/deleteRewards', [verifyToken], RewardControllers.deleteRewards)
    .post('/rewards/deleteAll', [verifyToken], RewardControllers.deleteAllReward);

router
    .get('/winnings', [verifyToken], WinningControllers.getAllWinnings)
    .delete('/winnings/:id', [verifyToken], WinningControllers.deleteWinning)
    .post('/winnings/deleteWinnings', [verifyToken], WinningControllers.deleteWinnings)
    .post('/winnings/deleteAll', [verifyToken], WinningControllers.deleteAllWinning)
    .post('/winnings', WinningControllers.createWinning);

router.post('/signup', AdminControllers.signup).post('/signin', AdminControllers.signin);

router
    .get('/admins', [verifyToken], AdminControllers.getAllAdmins)
    .put('/admins/:id', [verifyToken], AdminControllers.updateAdmin)
    .delete('/admins/:id', [verifyToken], AdminControllers.deleteAdmin)
    .post('/admins/deleteAdmins', [verifyToken], AdminControllers.deleteAdmins)
    .post('/admins/deleteAll', [verifyToken], AdminControllers.deleteAllAdmin);


module.exports = router;
