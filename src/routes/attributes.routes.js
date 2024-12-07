const { Router } = require('express');
const { 
    getAllAttributes,
    getAttribute,
    getAttributesByName,
    createAttribute,
    updateAttribute,
    deleteAttribute
} = require('../controllers/attributes.controller');

const attributesRoutes = Router();

attributesRoutes.get('/', getAllAttributes);
attributesRoutes.get('/:name', getAttribute);
attributesRoutes.get('/name/:name', getAttributesByName);
attributesRoutes.post('/', createAttribute);
attributesRoutes.put('/:name', updateAttribute);
attributesRoutes.delete('/:name', deleteAttribute);

module.exports = attributesRoutes;