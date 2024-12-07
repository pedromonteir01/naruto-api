const pool = require('../config/database.config');

const getAllAffiliations = async(req, res) => {
    try {
        const affiliations = await pool.query('SELECT * FROM affiliations;');
        if(affiliations.rowCount === 0) {
            return res.status(404).send({ message: 'Afiliação não encontrada' });
        } else {
            return res.status(200).send(affiliations.rows);
        }
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

const getAffiliation = async(req, res) => {
    const { name } = req.params;
    try {
        const affiliation = await pool.query('SELECT * FROM affiliation WHERE name=$1', [name]);
        if(affiliation.rowCount === 0) {
            return res.status(404).send({ message: 'Afiliação não encontrada' });
        } else {
            return res.status(200).send(affiliation.rows[0]);
        }
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

const getAffiliationsByName = async(req, res) => {
    const { name } = req.params;
    try {
        const affiliations = await pool.query('SELECT * FROM affiliations WHERE name LIKE $1', [`%${name}%`]);
        if(affiliations.rowCount === 0) {
            return res.status(404).send({ message: 'Afiliação não encontrada' });
        } else {
            return res.status(200).send(affiliations.rows);
        }
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

const createAffiliation = async(req, res) => {
    const { name, image, description } = req.body;

    if(!name || !image || !description) {
        return res.status(422).send({ message: 'Dados incompletos' });
    }

    if(typeof name !== 'string' || name.length < 3 || name.length > 100) {
        return res.status(400).send({ message: 'Nome inválido' });
    }

    if(typeof description !== 'string' || description.length < 10) {
        return res.status(400).send({ message: 'Descrição inválida' });
    }

    try {
        const affiliations = await pool.query(`
            INSERT INTO affiliations(name, image, description, generate_by_comunnity) 
            VALUES($1, $2, $3, $4) 
            RETURNING *`,
            [name, image, description, true]
        );

        return res.status(201).send(affiliations.rows[0]);
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

const updateAffiliation = async(req, res) => {
    const { name, image, description } = req.body;

    if(!name || !image || !description) {
        return res.status(422).send({ message: 'Dados incompletos' });
    }

    if(typeof name !== 'string' || name.length < 3 || name.length > 100) {
        return res.status(400).send({ message: 'Nome inválido' });
    }

    if(typeof description !== 'string' || description.length < 10) {
        return res.status(400).send({ message: 'Descrição inválida' });
    }

    try {
        const affiliation = await pool.query(`
            UPDATE affiliations SET
            name=$1, image=$2, description=$3, generate_by_comunnity=$4
            RETURNING *`,
            [name, image, description, true]
        );

        return res.status(200).send(affiliation.rows[0]);
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

const deleteAffiliation = async(req, res) => {
    const { name } = req.params;

    try {
        const affiliation = await pool.query(`
            DELETE FROM affiliations
            WHERE name=$1
            RETURNING *`,
            [name]
        );

        return res.status(200).send(affiliation.rows[0]);
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

const verifyAffiliations = async(affiliations) => {
    try {
        const { rows } = await pool.query(
            `SELECT * FROM affiliations WHERE name = ANY($1);`,
            [affiliations]
        );
        return rows.length === affiliations.length;
    } catch(e) {
        throw new Error('Erro de servidor, afiliação não encontrada');
    }
}

module.exports = { 
    getAllAffiliations, 
    getAffiliation, 
    getAffiliationsByName, 
    createAffiliation, 
    updateAffiliation, 
    deleteAffiliation,
    verifyAffiliations 
}