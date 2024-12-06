const { Router } = require('express');
const { 
    getAllKekkeiGenkais, 
    getKekkeiGenkai, 
    getKekkeiGenkaiByName, 
    createKekkeiGenkai, 
    updateKekkeiGenkai, 
    deleteKekkeiGenkai 
} = require('../controllers/kekkeiGenkai.controller');

const kekkeiGenkaiRoutes = Router();
kekkeiGenkaiRoutes.get('/', getAllKekkeiGenkais);
kekkeiGenkaiRoutes.get('/:name', getKekkeiGenkai);
kekkeiGenkaiRoutes.get('/name/:name', getKekkeiGenkaiByName);
kekkeiGenkaiRoutes.post('/', createKekkeiGenkai);
kekkeiGenkaiRoutes.put('/:name', updateKekkeiGenkai);
kekkeiGenkaiRoutes.delete('/:name', deleteKekkeiGenkai);

module.exports = kekkeiGenkaiRoutes;