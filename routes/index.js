const { Router } = require('express');
const router = Router();
const UserControllers = require('../controllers/user');
const RewardControllers = require('../controllers/reward');
const WinningControllers = require('../controllers/winning');
const AdminControllers = require('../controllers/admin');
const SettingControllers = require('../controllers/setting');
const uploadExcel = require('../middlewares/uploadExcel');
const uploadImage = require('../middlewares/uploadImage');
const verifyToken = require('../middlewares/authJwt');

router
    .post('/signup', AdminControllers.signup)
    .post('/signin', AdminControllers.signin)
    .head('/ping', [verifyToken], AdminControllers.ping);

router
    .get('/users/:companyId', [verifyToken], UserControllers.getAllUsers)
    .get('/users/:id', [verifyToken], UserControllers.getUserById)
    .post('/users', [verifyToken], UserControllers.createUser)
    .post('/users/uploadUser', [verifyToken], uploadExcel.single('file'), UserControllers.uploadUser)
    .put('/users/:id', [verifyToken], UserControllers.updateUser)
    .delete('/users/:id', [verifyToken], UserControllers.deleteUser)
    .post('/users/deleteUsers', [verifyToken], UserControllers.deleteUsers)
    .post('/users/deleteAll', [verifyToken], UserControllers.deleteAllUser)
    .post('/users/count', [verifyToken], UserControllers.getUserCount);

router
    .get('/rewards/:companyId', [verifyToken], RewardControllers.getAllRewards)
    .get('/rewards/:id', [verifyToken], RewardControllers.getRewardById)
    .post('/rewards', [verifyToken], uploadImage.single('file'), RewardControllers.uploadReward)
    .delete('/rewards/:id', [verifyToken], RewardControllers.deleteReward)
    .put('/rewards/:id', [verifyToken], RewardControllers.updateReward)
    .post('/rewards/deleteRewards', [verifyToken], RewardControllers.deleteRewards)
    .post('/rewards/deleteAll', [verifyToken], RewardControllers.deleteAllReward)
    .post('/rewards/createAdditionalReward', [verifyToken], RewardControllers.createAdditionalReward)
    .post('/rewards/updateWinningResult/:id', [verifyToken], RewardControllers.updateWinningResult)
    .post('/rewards/count', [verifyToken], RewardControllers.getRewardCount)
    .post('/rewards/getNoWinningsRewards', [verifyToken], RewardControllers.getNoWinningsRewards);

router
    .get('/winnings/:companyId', [verifyToken], WinningControllers.getAllWinnings)
    .delete('/winnings/:id', [verifyToken], WinningControllers.deleteWinning)
    .post('/winnings/deleteWinnings', [verifyToken], WinningControllers.deleteWinnings)
    .post('/winnings/deleteAll', [verifyToken], WinningControllers.deleteAllWinning)
    .post('/winnings', WinningControllers.createWinning);

router
    .get('/admins/:companyId', [verifyToken], AdminControllers.getAllAdmins)
    .post('/admins/createAdmin', [verifyToken], AdminControllers.createAdmin)
    .put('/admins/:id', [verifyToken], AdminControllers.updateAdmin)
    .post('/admins/updatePassword', [verifyToken], AdminControllers.updateAdminPassword)
    .delete('/admins/:id', [verifyToken], AdminControllers.deleteAdmin)
    .post('/admins/deleteAdmins', [verifyToken], AdminControllers.deleteAdmins)
    .post('/admins/deleteAll', [verifyToken], AdminControllers.deleteAllAdmin);

router
    .get('/settings/:companyId', [verifyToken], SettingControllers.getSettingById)
    .post('/settings', [verifyToken], SettingControllers.createSetting)
    .post('/settings/update', [verifyToken], uploadImage.single('file'), SettingControllers.updateSetting);

module.exports = router;
