const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const loginRoutes = require('./login.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/login', loginRoutes);
router.use('/logout', loginRoutes);
router.use('/signup', loginRoutes);

module.exports = router;