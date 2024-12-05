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
        const character = await pool.query('SELECT * FROM characters WHERE id=$1', [id]);
        if (character.rowCount == 0) {
            return res.status(404).send({ message: 'Personagem não encontrado' });
        } else {
            return res.status(200).send(character.rows[0]);
        }
    } catch (e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

const createCharacter = async(req, res) => {
    let errors = [];
    const { name, description, image, metadata, gender, birthdate } = req.body;

    if(!name || !description || !image || !metadata || !gender || !birthdate) {
        return res.status(422).send({ message: 'Dados incompletos' });
    }

    if (typeof name !== 'string' || name.length < 2 || name.length > 100) {
        errors.push('O nome deve ser uma string com 2 a 100 caracteres');
    }

    if(typeof description !== 'string' || description.length < 10) {
        errors.push('Descrição muito curta, deve conter no mínimo 10 caracteres');
    }

    if(typeof gender !== 'string' || gender.length != 1) {
        errors.push('Sexo inválido, H para homem, M para mulher, O para outro');
    }

    if(errors.length > 0) {
        return res.status(400).send(errors[0]); //retorna somente o primeiro erro por req para poupar gasto de memória
    }

    try {
        const character = await pool.query(`
            INSERT INTO characters(name, description, image, metadata, gender, birthdate) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
            `, [name, description, image, metadata, gender, birthdate]);

        return res.status(201).send({ 
            success: 'personagem cadastrado com sucesso', 
            character: character.rows[0] 
        })
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}


const updateCharacter = async(req, res) => {
    let errors = [];
    const { id } = req.params;
    const { name, description, image, metadata, gender, birthdate } = req.body;

    if(!name || !description || !image || !metadata || !gender || !birthdate) {
        return res.status(422).send({ message: 'Dados incompletos' });
    }

    if (typeof name !== 'string' || name.length < 2 || name.length > 100) {
        errors.push('O nome deve ser uma string com 2 a 100 caracteres');
    }

    if(typeof description !== 'string' || description.length < 10) {
        errors.push('Descrição muito curta, deve conter no mínimo 10 caracteres');
    }

    if(typeof gender !== 'string' || gender.length != 1) {
        errors.push('Sexo inválido, H para homem, M para mulher, O para outro');
    }

    if(errors.length > 0) {
        return res.status(400).send(errors[0]); //retorna somente o primeiro erro por req para poupar gasto de memória
    }

    try {
        const character = await pool.query(`
            UPDATE characters SET name=$1, description=$2, image=$3, metadata=$4, gender=$5, birthdate=$6 
            RETURNING *
            `, [name, description, image, metadata, gender, birthdate]);

        return res.status(200).send({ 
            success: 'personagem alterado com sucesso', 
            character: character.rows[0] 
        })
    } catch(e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

module.exports = { getAllCharacters, getCharacterById, createCharacter, updateCharacter };