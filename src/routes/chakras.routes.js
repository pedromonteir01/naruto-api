const { Router } = require('express');

const chakrasRoutes = Router();

chakrasRoutes.get('/');
chakrasRoutes.get('/:chakra');

module.exports = chakrasRoutes;