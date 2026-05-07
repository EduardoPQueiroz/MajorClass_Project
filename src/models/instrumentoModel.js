var database = require("../database/config");

function buscarInstrumentos() {

    var instrucaoSql = `select * from instrumento;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarInstrumentos
}