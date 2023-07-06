const {register,login,getVerifiedUsers,verified,updateUser,deleteUser} = require('../controllers/userController');
const {authenticateTokenAdmin} = require('../JWT/JWT_authenticateAdmin');

exports.userRouters = (app) => {
    app.get('/verify/:token', verified)
    app.get('/users', getVerifiedUsers)
    app.post('/users/register', register)
    app.post('/users/login', login)
}