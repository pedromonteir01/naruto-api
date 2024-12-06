const pool = require('../config/database.config');

const getAllChakras = async(req, res) => {
    try {
        const chakras = await pool.query('SELECT * FROM chakras');
        if(chakras.rowCount === 0) {
            return res.status(404).send({ message: 'Nenhum chakra encontrado' }); 
        } else {
            return res.status(200).send(chakras.rows); 
        }
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

const getChakraByName = async(req, res) => {
    const { name } = req.param;
    try {
        const chakra = await pool.query('SELECT * FROM chakras WHERE name=$1',[name]);
        if(chakra.rowCount === 0) {
            return res.status(404).send({ message: 'Este chakra não existe' }); 
        } else {
            return res.status(200).send(chakra.rows[0]); 
        }
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

module.exports = { getAllChakras, getChakraByName }