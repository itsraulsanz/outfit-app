const router = require('express').Router();
const userRoutes = require('./userRoutes');
const outfitsRoutes = require('./outfitsRoutes');

router.use('/users', userRoutes);
router.use('/outfits', outfitsRoutes);

module.exports = router;


