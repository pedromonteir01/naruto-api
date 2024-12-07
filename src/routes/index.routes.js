const { Router } = require('express');
const charactersRoutes = require('./characters.routes');
const kekkeiGenkaiRoutes = require('./kekkeiGenkai.routes');
const kekkeiToutaRoutes = require('./kekkeiTouta.routes');
const chakrasRoutes = require('./chakras.routes');

const router = Router();

router.use('/characters', charactersRoutes);
router.use('/kekkei_genkais', kekkeiGenkaiRoutes);
router.use('/kekkei_toutas', kekkeiToutaRoutes);
router.use('/chakras', chakrasRoutes);

module.exports = router;