const validChakras = ['fogo', 'água', 'terra', 'vento', 'relâmpago'];

const getAllChakras = (req, res) => {
    return res.status(200).send({ chakra: validChakras });
}

const verifyChakra = (chakras) => { 
    const invalid = chakras.filter((chakra) => !validChakras.includes(chakra));

    const verifiedChakras = {
        chakras: validChakras,
        invalidChakras: invalid
    }

    return verifiedChakras;
}

module.exports = { getAllChakras, verifyChakra }