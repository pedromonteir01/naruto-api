const { Router } = require('express');
const { 
    getAllAffiliations, 
    getAffiliation, 
    getAffiliationsByName, 
    createAffiliation, 
    updateAffiliation, 
    deleteAffiliation 
} = require('../controllers/affiliations.controller');

const affiliationsRoutes = Router();

affiliationsRoutes.get('/', getAllAffiliations);
affiliationsRoutes.get('/:name', getAffiliation);
affiliationsRoutes.get('/name/:name', getAffiliationsByName);
affiliationsRoutes.post('/', createAffiliation);
affiliationsRoutes.put('/:name', updateAffiliation);
affiliationsRoutes.delete('/:name', deleteAffiliation);