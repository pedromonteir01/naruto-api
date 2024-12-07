const { verifyAffiliations } = require('../controllers/affiliations.controller');
const { verifyAttributes } = require('../controllers/attributes.controller');
const { verifyChakra } = require('../controllers/chakras.controller');
const { verifyKekkeiGenkais } = require('../controllers/kekkeiGenkai.controller');
const { verifyKekkeiTouta } = require('../controllers/kekkeiTouta.controller');

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

    if (data.chakras !== 'none') {
        if (!Array.isArray(data.chakras)) {
            return 'Os chakras devem ser fornecidos como um array.';
        }
    
        const response = verifyChakra(data.chakras);
    
        if (response.invalidChakras.length > 0) {
            return `Os seguintes chakras são inválidos: ${response.invalidChakras.join(', ')}. Tente estes: ${response.chakras.join(', ')}`;
        } else {
            return 'sucesso';
        }
    }


    if (data.kekkei_genkais !== 'none') {
        try {
            const isValid = await verifyKekkeiGenkais(data.kekkei_genkais);
            if (!isValid) {
                return 'Alguma das kekkei genkais não existem';
            } else {
                return 'sucesso';
            }
        } catch (error) {
            return error;
        }
    }

    if (data.kekkei_toutas !== 'none') {
        try {
            const isValid = await verifyKekkeiTouta(data.kekkei_toutas);
            if (!isValid) {
                return 'Alguma das kekkei toutas não existem';
            } else {
                return 'sucesso';
            }
        } catch (error) {
            return error;
        }
    }

    if (data.attributes !== 'none') {
        try {
            const isValid = await verifyAttributes(data.attributes);
            if (!isValid) {
                return 'Algum dos atributos não existem';
            } else {
                return 'sucesso';
            }
        } catch(error) {
            return error;
        }
    }

    if (data.affiliations !== 'none') {
        try {
            const isValid = await verifyAffiliations(data.affiliations);
            if (!isValid) {
                return 'Alguma das afiliações não existem';
            } else {
                return 'sucesso';
            }
        } catch(error) {
            return error;
        }
    }

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

module.exports = verifyMetadata;