const router = require('express').Router();

const { HttpCheckLoggedIn } = require('../../controllers/auth/authController');
const { sendMessage } = require('../../controllers/messages/messages');

router.post('/messages/:userId', HttpCheckLoggedIn, sendMessage);
router.post('/chats', HttpCheckLoggedIn);
router.route('/chats/:chatId').get(HttpCheckLoggedIn).delete(HttpCheckLoggedIn);

module.exports = router;
