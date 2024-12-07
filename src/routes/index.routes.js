const { Router } = require('express');
const charactersRoutes = require('./characters.routes');
const kekkeiGenkaiRoutes = require('./kekkeiGenkai.routes');
const kekkeiToutaRoutes = require('./kekkeiTouta.routes');
const chakrasRoutes = require('./chakras.routes');
const affiliationsRoutes = require('./affiliations.routes');
const attributesRoutes = require('./attributes.routes');

const router = Router();

router.use('/characters', charactersRoutes);
router.use('/kekkei_genkais', kekkeiGenkaiRoutes);
router.use('/kekkei_toutas', kekkeiToutaRoutes);
router.use('/chakras', chakrasRoutes);
router.use('/affiliations', affiliationsRoutes);
router.use('/attributes', attributesRoutes);

module.exports = router;