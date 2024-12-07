const pool = require('../config/database.config');

const getAllAttributes = async(req, res) => {
    try {
        const attributes = await pool.query('SELECT * FROM attributes;');
        if(attributes.rowCount === 0) {
            return res.status(404).send({ message: 'Atributos não encontrados' });
        } else {
            return res.status(200).send(attributes.rows);
        }
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

const getAttribute = async(req, res) => {
    const { name } = req.params;
    try {
        const attributes = await pool.query('SELECT * FROM attributes WHERE name=$1', [name]);
        if(attributes.rowCount === 0) {
            return res.status(404).send({ message: 'Atributo não encontrado' });
        } else {
            return res.status(200).send(attributes.rows[0]);
        }
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

const getAttributesByName = async(req, res) => {
    const { name } = req.params;
    try {
        const attributes = await pool.query('SELECT * FROM attributes WHERE name LIKE $1', [`%${name}%`]);
        if(attributes.rowCount === 0) {
            return res.status(404).send({ message: 'Atributos não encontrados' });
        } else {
            return res.status(200).send(attributes.rows);
        }
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

const createAttribute = async(req, res) => {
    const { name, description } = req.body;

    if(!name || !description) {
        return res.status(422).send({ message: 'Dados incompletos' });
    }

    if(typeof name !== 'string' || name.length < 3 || name.length > 100) {
        return res.status(400).send({ message: 'Nome inválido' });
    }

    if(typeof description !== 'string' || description.length < 10) {
        return res.status(400).send({ message: 'Descrição inválida' });
    }

    try {
        const attributes = await pool.query(`
            INSERT INTO attributes(name, description, generate_by_comunnity) 
            VALUES($1, $2, $3) 
            RETURNING *`,
            [name, description, true]
        );

        return res.status(201).send(attributes.rows[0]);
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

const updateAttribute = async(req, res) => {
    const { name, description } = req.body;

    if(!name || !description) {
        return res.status(422).send({ message: 'Dados incompletos' });
    }

    if(typeof name !== 'string' || name.length < 3 || name.length > 100) {
        return res.status(400).send({ message: 'Nome inválido' });
    }

    if(typeof description !== 'string' || description.length < 10) {
        return res.status(400).send({ message: 'Descrição inválida' });
    }

    try {
        const attributes = await pool.query(`
            UPDATE attributes SET
            name=$1, description=$2, generate_by_comunnity=$3
            RETURNING *`,
            [name, description, true]
        );

        return res.status(200).send(attributes.rows[0]);
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

const deleteAttribute = async(req, res) => {
    const { name } = req.params;

    try {
        const attributes = await pool.query(`
            DELETE FROM attributes
            WHERE name=$1
            RETURNING *`,
            [name]
        );

        return res.status(200).send(attributes.rows[0]);
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

const verifyAttributes= async(attributes) => {
    try {
        const { rows } = await pool.query(
            `SELECT * FROM attributes WHERE name = ANY($1);`,
            [attributes]
        );
        return rows.length === attributes.length;
    } catch(e) {
        throw new Error('Erro de servidor, atributo não encontrado');
    }
}

module.exports = { 
    getAllAttributes,
    getAttribute,
    getAttributesByName,
    createAttribute,
    updateAttribute,
    deleteAttribute,
    verifyAttributes
}