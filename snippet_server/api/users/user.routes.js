const router = require('express').Router();

const controller = require ('./user.controller')
const middleware = require('../middleware/authorization')

// const users = require('../../../mock_database/users.json');
// const snippets = require('../../../mock_database/snippets.json');
// const bookmarks = require('../../../mock_database/bookmarks.json');

// GET /users/:id
router.get('/:id', controller.getUsersById);
router.post('/register', controller.registerUser);
// router.post('/', middleware.verifyToken, controller.updateUser);

router.put('/:id',middleware.verifyToken, controller.updateUser );

// login 
router.post('/login', controller.loginUser)

module.exports = router;