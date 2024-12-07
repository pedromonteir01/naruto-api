const pool = require('../config/database.config');
const verifyDate = require('../utilities/verifyDate');
const verifyMetadata = require('../services/validationService');

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

const createCharacter = async (req, res) => {
    let errors = [];
    const { name, description, image, metadata, gender, birthdate } = req.body;

    if (!name || !description || !image || !metadata || !gender || !birthdate) {
        return res.status(422).send({ message: 'Dados incompletos' });
    }

    if (typeof name !== 'string' || name.length < 2 || name.length > 100) {
        errors.push('O nome deve ser uma string com 2 a 100 caracteres');
    }

    if (typeof description !== 'string' || description.length < 10) {
        errors.push('Descrição muito curta, deve conter no mínimo 10 caracteres');
    }

    if (typeof gender !== 'string' || gender.length != 1) {
        errors.push('Sexo inválido, H para homem, M para mulher, O para outro');
    }

    try {
        const response = await verifyMetadata(metadata);
        if(response.message) {
            return res.status(500).send({ error: response.message });
        }

        if(response !== 'sucesso') {
            errors.push(response);
        }
    } catch (e) {
        errors.push(e.message); // Adiciona a mensagem do erro no array de erros
    }
    

    if(!verifyDate(birthdate)) {
        errors.push('Data inválida, padrão (yyyy-mm-dd)');
    }

    if (errors.length > 0) {
        return res.status(400).send({ error: errors[0] }); //retorna somente o primeiro erro por req para poupar gasto de memória
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
    } catch (e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    } 
}


const updateCharacter = async (req, res) => {
    let errors = [];
    const { id } = req.params;
    const { name, description, image, metadata, gender, birthdate } = req.body;

    if (!name || !description || !image || !metadata || !gender || !birthdate) {
        return res.status(422).send({ message: 'Dados incompletos' });
    }

    if (typeof name !== 'string' || name.length < 2 || name.length > 100) {
        errors.push('O nome deve ser uma string com 2 a 100 caracteres');
    }

    if (typeof description !== 'string' || description.length < 10) {
        errors.push('Descrição muito curta, deve conter no mínimo 10 caracteres');
    }

    if (typeof gender !== 'string' || gender.length != 1 || gender === 'M' || gender === 'm' || gender === 'H' || gender === 'h' || gender === 'O' || gender === 'o') {
        errors.push('Sexo inválido, H para homem, M para mulher, O para outro');
    }
    
    try {
        const response = await verifyMetadata(metadata);
        if(response.message) {
            return res.status(500).send({ error: response.message });
        }

        if(response !== 'sucesso') {
            errors.push(response);
        }
    } catch (e) {
        errors.push(e.message); // Adiciona a mensagem do erro no array de erros
    }

    if(!verifyDate(birthdate)) {
        errors.push('Data inválida, padrão (yyyy-mm-dd)');
    }

    if (errors.length > 0) {
        return res.status(400).send({ error: errors[0]}); //retorna somente o primeiro erro por req para poupar gasto de memória
    }

    try {
        const characterExists = (await pool.query('SELECT * FROM characters WHERE id=1', [id])).rows[0];

        if (!characterExists) {
            return res.status(404).send({ message: 'Personagem não encontrado' });
        }

        const character = await pool.query(`
            UPDATE characters SET name=$1, description=$2, image=$3, metadata=$4, gender=$5, birthdate=$6 
            WHERE id=$7
            RETURNING *
            `, [name, description, image, metadata, gender, birthdate, id]);

        return res.status(200).send({
            success: 'personagem alterado com sucesso',
            character: character.rows[0]
        })
    } catch (e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

const deleteCharacter = async (req, res) => {
    const { id } = req.params;
    try {
        const characterExists = (await pool.query('SELECT * FROM characters WHERE id=1', [id])).rows[0];

        if (!characterExists) {
            return res.status(404).send({ message: 'Personagem não encontrado' });
        }

        const character = await pool.query('DELETE FROM character WHERE id=$1 RETURNING *',[id]);
        return res.status(200).send({
            success: 'personagem deletado com sucesso',
            character: character.rows[0]
        })
    } catch (e) {
        return res.status(500).send({ error: 'Erro de servidor' });
    }
}

module.exports = { getAllCharacters, getCharacterById, createCharacter, updateCharacter, deleteCharacter };