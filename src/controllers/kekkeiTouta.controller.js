const pool = require('../config/database.config');

const getAllKekkeiToutas = async(req, res) => {
    try {
        const kekkeiToutas = await pool.query('SELECT * FROM kekkei_touta');
        if(kekkeiToutas.rowCount === 0) {
            return res.status(404).send({ message: 'Nenhuma kekkei touta encontrada' });
        } else {
            return res.status(200).send(kekkeiToutas.rows);
        }
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

const getKekkeiTouta = async(req, res) => {
    const { name } = req.params;
    try {
        const kekkeiTouta = await pool.query('SELECT * FROM kekkei_touta WHERE name=$1', [name]);
        if(kekkeiTouta.rowCount === 0) {
            return res.status(404).send({ message: 'Kekkei Touta não encontrada' });
        } else {
            return res.status(200).send(kekkeiTouta.rows[0]);
        }
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

const getKekkeiToutaByName = async(req, res) => {
    const { name } = req.params;
    try {
        const kekkeiTouta = await pool.query('SELECT * FROM kekkei_touta WHERE name LIKE $1', [`%${name}%`]);
        if(kekkeiTouta.rowCount === 0) {
            return res.status(404).send({ message: 'Kekkei Touta não encontrada' });
        } else {
            return res.status(200).send(kekkeiTouta.rows);
        }
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

const createKekkeiTouta = async(req, res) => {
    const { name, image, description } = req.body;

    if(!name || !image || !description) {
        return res.status(422).send({ message: 'Dados incompletos' });
    }

    if(typeof name === 'string' || name.length < 3 || name.length > 100) {
        return res.status(400).send({ message: 'Nome inválido' });
    }

    if(typeof description === 'string' || description.length < 10) {
        return res.status(400).send({ message: 'Descrição inválida' });
    }

    try {
        const kekkeiTouta = await pool.query(`
            INSERT INTO kekkei_touta(name, image, description, generate_by_comunnity) 
            VALUES($1, $2, $3, $4) 
            RETURNING *`,
            [name, image, description, true]
        );

        return res.status(201).send(kekkeiTouta.rows[0]);
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

const updateKekkeiTouta = async(req, res) => {
    const { name, image, description } = req.body;

    if(!name || !image || !description) {
        return res.status(422).send({ message: 'Dados incompletos' });
    }

    if(typeof name === 'string' || name.length < 3 || name.length > 100) {
        return res.status(400).send({ message: 'Nome inválido' });
    }

    if(typeof description === 'string' || description.length < 10) {
        return res.status(400).send({ message: 'Descrição inválida' });
    }

    try {
        const kekkeiTouta = await pool.query(`
            UPDATE kekkei_touta SET
            name=$1, image=$2, description=$3, generate_by_comunnity=$4
            RETURNING *`,
            [name, image, description, true]
        );

        return res.status(200).send(kekkeiTouta.rows[0]);
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

const deleteKekkeiTouta = async(req, res) => {
    const { name } = req.params;

    try {
        const kekkeiTouta = await pool.query(`
            DELETE FROM kekkei_touta
            WHERE name=$1
            RETURNING *`,
            [name]
        );

        return res.status(200).send(kekkeiTouta.rows[0]);
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

const verifyKekkeiTouta = async(kekkeiToutas) => {
    try {
        const { rows } = await pool.query(
            `SELECT * FROM kekkei_touta WHERE name = ANY($1);`,
            [kekkeiToutas]
        );
        return rows.length === kekkeiToutas.length;
    } catch(e) {
        throw new Error('Erro de servidor, kekkei touta não encontrada');
    }
}

module.exports = { 
    getAllKekkeiToutas,
    getKekkeiTouta,
    getKekkeiToutaByName,
    createKekkeiTouta,
    updateKekkeiTouta,
    deleteKekkeiTouta,
    verifyKekkeiTouta
}