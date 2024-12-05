const { Router } = require('express');
const { 
    getAllCharacters, 
    getCharacterById, 
    createCharacter
} = require('../controllers/characters.controller');

const charactersRoutes = Router(); 

charactersRoutes.get('/', getAllCharacters);
charactersRoutes.get('/:id', getCharacterById);
charactersRoutes.post('/', createCharacter);

module.exports = charactersRoutes;