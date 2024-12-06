const { verifyKekkeiGenkais } = require('../controllers/kekkeiGenkai.controller');

const test = {
    attributes: ['one'],
    chakras: ['two'],
    kekkei_genkais: ['three'],
    kekkei_toutas: ['four'],
    affiliations: 'none',
}

const verifyMetadata = async(data) => {
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
    const isValid = await verifyKekkeiGenkais(data.kekkei_genkais);
    if(!isValid) {
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

console.log(verifyMetadata(test));


module.exports = verifyMetadata;