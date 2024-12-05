const pool = require('../config/database.config');

const getAllCharacters = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM characters');
        if (response.rowCount === 0) {
            return res.status(404).send({ message: 'Nenhum personagem encontrado' });
        } else {
            return res.status(200).send(response.rows);
        }
    } catch (e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
};

module.exports = { getAllCharacters };