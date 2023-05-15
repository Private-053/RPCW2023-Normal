var Empregos = require("../models/empregos")
var mongoose = require('mongoose')

// get todos os contratos
module.exports.list = () => {
    return Empregos.find()
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

/* GET /contracts/:id: devolve o contrato com identificador id; */
module.exports.consultar = id => {
    return Empregos.findOne({id: id}).exec()
}

/* GET /contracts?year=YYYY: devolve a lista dos contratos realizados durante o ano YYYY; */
module.exports.listYear = year => {
    return cModel.find({"DataInicioContrato":{$regex:String(year)}})
    .then(dados=>{
        return dados;
    })
    .catch(erro=>{
        return erro;
    });
}

/* GET /contracts?inst=AAA: devolve a lista dos contratos realizados pela instituição contratante AAA;*/
module.exports.consultarInst = inst => {
    return Empregos.find({NomeInstituicao: inst}).exec()
}


/* GET /contracts/courses: devolve a lista dos cursos dos contranoatados (sem repetições);*/
module.exports.consultarCursos = () => {
    return Empregos.distinct("Curso").exec()
}

/* GET /contracts/institutions: devolve a lista das instituições contratantes (sem repetições);*/
module.exports.consultarInstituicoes = () => {
    return Empregos.distinct("NomeInstituicao").exec()
}

/* POST /contracts: acrescenta um contrato novo à BD;*/
module.exports.inserir = emprego => {
    emprego.id = mongoose.Types.ObjectId()
    var novo = new Empregos(emprego)
    return novo.save()
}

/* DELETE /contracts/:id: elimina da BD o contrato com o identificador id.*/
module.exports.eliminar = id => {
    return Empregos.deleteOne({id: id})
}
