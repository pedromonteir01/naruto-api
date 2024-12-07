const validChakras = ['fogo', 'água', 'terra', 'vento', 'relâmpago'];
exports.verifyChakra = (chakras) => { 
    const invalid = chakras.filter((chakra) => !validChakras.includes(chakra));

    const verifiedChakras = {
        chakras: validChakras,
        invalidChakras: invalid
    }

    return verifiedChakras;
}