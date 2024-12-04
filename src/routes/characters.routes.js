const { Router } = require('express');
const { getAllCharacters } = require('../controllers/characters.controller');

const charactersRoutes = Router(); 

charactersRoutes.get('/', getAllCharacters);

module.exports = charactersRoutes;