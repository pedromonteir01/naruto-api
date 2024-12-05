const { Router } = require('express');
const { 
    getAllCharacters, 
    getCharacterById 
} = require('../controllers/characters.controller');

const charactersRoutes = Router(); 

charactersRoutes.get('/', getAllCharacters);
charactersRoutes.get('/:id', getCharacterById);

module.exports = charactersRoutes;