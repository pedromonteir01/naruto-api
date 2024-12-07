const { Router } = require('express');
const { 
    getAllKekkeiToutas, 
    getKekkeiTouta, 
    getKekkeiToutaByName, 
    createKekkeiTouta, 
    updateKekkeiTouta, 
    deleteKekkeiTouta 
} = require('../controllers/kekkeiTouta.controller');

const kekkeiToutaRoutes = Router();
kekkeiToutaRoutes.get('/', getAllKekkeiToutas);
kekkeiToutaRoutes.get('/:name', getKekkeiTouta);
kekkeiToutaRoutes.get('/name/:name', getKekkeiToutaByName);
kekkeiToutaRoutes.post('/', createKekkeiTouta);
kekkeiToutaRoutes.put('/:name', updateKekkeiTouta);
kekkeiToutaRoutes.delete('/:name', deleteKekkeiTouta);

module.exports = kekkeiToutaRoutes;