const pool = require('../config/database.config');

const test = {
    attributes: ['one'],
    chakras: ['two'],
    kekkei_genkai: ['three'],
    kekkei_touta: ['four'],
    affiliations: ['five'],
}

const havePropierties = (keys) => {
    const properties = [
        'attributes',
        'chakras',
        'kekkei_genkai',
        'kekkei_touta',
        'affiliations'
    ];

    const hasAllRequired = properties.every(prop => keys.includes(prop));
    const hasNoExtras = keys.every(key => properties.includes(key));
    return hasAllRequired && hasNoExtras;
}

const verifyMetadata = (data) => {
    const keys = Object.keys(data);
    if(havePropierties(keys)) {
        
    } else {
        return false;
    }
};

console.log(verifyMetadata(test));


module.exports = verifyMetadata;