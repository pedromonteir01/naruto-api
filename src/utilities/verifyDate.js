const verifyDate = (dateString) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if(!dateRegex.test(dateString)) return false; // valida formato da data yyyy-mm-dd

    const date = new Date(dateString);

    if(isNaN(date.getTime())) return false; // Verifica se a data é inválida (Date.getTime() retorna NaN para datas inválidas

    const [year, month, day] = dateString.split('-').map(Number);
    
    return(
        date.getUTCFullYear() === year &&
        date.getUTCMonth() === month - 1 &&
        date.getUTCDate() === day
    );
}

module.exports = verifyDate;