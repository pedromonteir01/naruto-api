const { Router } = require('express');
const { getAllChakras } = require('../controllers/chakras.controller');

const chakrasRoutes = Router();

chakrasRoutes.get('/', getAllChakras);

module.exports = chakrasRoutes;