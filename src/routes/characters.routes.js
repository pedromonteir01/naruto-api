const { Router } = require('express');
const { 
    getAllCharacters, 
    getCharacterById, 
    createCharacter,
    updateCharacter,
    deleteCharacter
} = require('../controllers/characters.controller');

const charactersRoutes = Router(); 

charactersRoutes.get('/', getAllCharacters);
charactersRoutes.get('/:id', getCharacterById);
charactersRoutes.post('/', createCharacter);
charactersRoutes.put('/:id', updateCharacter);
charactersRoutes.delete('/:id', deleteCharacter);

module.exports = charactersRoutes;