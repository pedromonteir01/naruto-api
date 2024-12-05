const { Router } = require('express');
const { 
    getAllCharacters, 
    getCharacterById, 
    createCharacter,
    updateCharacter
} = require('../controllers/characters.controller');

const charactersRoutes = Router(); 

charactersRoutes.get('/', getAllCharacters);
charactersRoutes.get('/:id', getCharacterById);
charactersRoutes.post('/', createCharacter);
charactersRoutes.put('/:id', updateCharacter);

module.exports = charactersRoutes;