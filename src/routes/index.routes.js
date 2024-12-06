const { Router } = require('express');
const charactersRoutes = require('./characters.routes');
const kekkeiGenkaiRoutes = require('./kekkeiGenkai.routes');

const router = Router();

router.use('/characters', charactersRoutes);
router.use('/kekkei_genkais', kekkeiGenkaiRoutes);

module.exports = router;