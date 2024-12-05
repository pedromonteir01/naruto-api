const pool = require('../config/database.config');

const getAllCharacters = async (req, res) => {
    try {
        const characters = await pool.query('SELECT * FROM characters');
        if (characters.rowCount === 0) {
            return res.status(404).send({ message: 'Nenhum personagem encontrado' });
        } else {
            return res.status(200).send(characters.rows);
        }
    } catch (e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
};

const getCharacterById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const character = await pool.query('SELECT * FROM characters WHERE id=$1',[id]);
        if(character.rowCount == 0) {
            return res.status(404).send({ message: 'Personagem não encontrado' });
        } else {
            return res.status(200).send(character.rows[0]);
        }
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

module.exports = { getAllCharacters, getCharacterById };