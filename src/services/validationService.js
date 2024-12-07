const { verifyKekkeiGenkais } = require('../controllers/kekkeiGenkai.controller');

const test = {
    attributes: ['one'],
    chakras: ['two'],
    kekkei_genkais: ['sharingan', 'rinnegan', 'test'],
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


    if (data.kekkei_genkais !== 'none') {
        try {
            const isValid = await verifyKekkeiGenkais(data.kekkei_genkais);
            if (!isValid) {
                return false;
            }
        } catch (error) {
            return false; // Se ocorrer erro na verificação
        }
    }

    // Verifica as Kekkei Tōtas
    if (data.kekkei_toutas !== 'none') {
        try {
            const isValid = await verifyKekkeiTouta(data.kekkei_toutas);
            if (!isValid) {
                return false;
            }
        } catch (error) {
            return false; // Se ocorrer erro na verificação
        }
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