const pool = require('../config/database.config');

const getAllKekkeiGenkais = async(req, res) => {
    try {
        const kekkeiGenkais = await pool.query('SELECT * FROM kekkei_genkai');
        if(kekkeiGenkais.rowCount === 0) {
            return res.status(404).send({ message: 'Nenhuma kekkei genkai encontrada' });
        } else {
            return res.status(200).send(kekkeiGenkais.rows);
        }
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

const getKekkeiGenkai = async(req, res) => {
    const { name } = req.params;
    try {
        const kekkeiGenkai = await pool.query('SELECT * FROM kekkei_genkai WHERE name=$1', [name]);
        if(kekkeiGenkai.rowCount === 0) {
            return res.status(404).send({ message: 'Kekkei genkai não encontrada' });
        } else {
            return res.status(200).send(kekkeiGenkai.rows[0]);
        }
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

const getKekkeiGenkaiByName = async(req, res) => {
    const { name } = req.params;
    try {
        const kekkeiGenkai = await pool.query('SELECT * FROM kekkei_genkai WHERE name LIKE $1', [`%${name}%`]);
        if(kekkeiGenkai.rowCount === 0) {
            return res.status(404).send({ message: 'Kekkei genkai não encontrada' });
        } else {
            return res.status(200).send(kekkeiGenkai.rows);
        }
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

const createKekkeiGenkai = async(req, res) => {
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
        const kekkeiGenkai = await pool.query(`
            INSERT INTO kekkei_genkai(name, image, description, generate_by_comunnity) 
            VALUES($1, $2, $3, $4) 
            RETURNING *`,
            [name, image, description, true]
        );

        return res.status(201).send(kekkeiGenkai.rows);
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

const updateKekkeiGenkai = async(req, res) => {
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
        const kekkeiGenkai = await pool.query(`
            UPDATE kekkei_genkai SET
            name=$1, image=$2, description=$3, generate_by_comunnity=$4
            RETURNING *`,
            [name, image, description, true]
        );

        return res.status(200).send(kekkeiGenkai.rows);
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

const deleteKekkeiGenkai = async(req, res) => {
    const { name } = req.params;

    try {
        const kekkeiGenkai = await pool.query(`
            DELETE FROM kekkei_genkai
            WHERE name=$1
            RETURNING *`,
            [name]
        );

        return res.status(200).send(kekkeiGenkai.rows);
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

const verifyKekkeiGenkais = async(kekkeiGenkais) => {
    console.log('chegou');
    try {
        const { rows } = await pool.query(
            `SELECT * FROM kekkei_genkai WHERE name = ANY($1);`,
            [kekkeiGenkais]
        );

        return rows.length === kekkeiGenkais.length;
    } catch(e) {
        return 'Erro de servidor, kekkei não encontrada';
    }
}

module.exports = { 
    getAllKekkeiGenkais, 
    getKekkeiGenkai, 
    getKekkeiGenkaiByName, 
    createKekkeiGenkai, 
    updateKekkeiGenkai, 
    deleteKekkeiGenkai,
    verifyKekkeiGenkais 
}