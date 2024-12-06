const { verifyKekkeiGenkais } = require('../controllers/kekkeiGenkai.controller');

const test = {
    attributes: ['one'],
    chakras: ['two'],
    kekkei_genkais: ['sharingan', 'rinnegan'],
    kekkei_toutas: ['four'],
    affiliations: 'none',
}

const verifyMetadata = async (data) => {
    const keys = Object.keys(data);

    //verifica se há todas as propriedades
    if (!havePropierties(keys)) {
        return false;
    }

    //verifica se os valores dos atributos conferem conforme o padrão do sistema
    for (const key in data) {
        const value = data[key];
        if (!Array.isArray(value) && value !== 'none') {
            return false;
        }
    }

    //verifica as kekkei genkais
    if (data.kekkei_genkais === 'none') {
        return true;
    }
    const isValid = await verifyKekkeiGenkais(data.kekkei_genkais);
    if (isValid === 'Erro de servidor, kekkei não encontrada') {
        return false;
    }

    return true;
};

//verifica as propriedades do objeto data
const havePropierties = (keys) => {
    const properties = [
        'attributes',
        'chakras',
        'kekkei_genkais',
        'kekkei_toutas',
        'affiliations'
    ];

    const hasAllRequired = properties.every(prop => keys.includes(prop));
    const hasNoExtras = keys.every(key => properties.includes(key));
    return hasAllRequired && hasNoExtras;
}

(async () => {
    try {
        let result = await verifyMetadata(test);
        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();


module.exports = verifyMetadata;