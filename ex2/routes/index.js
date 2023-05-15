var express = require('express');
var router = express.Router();
var Empregos = require('../controllers/empregos')


router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Empregos.list()
    .then(empregos => {
      res.render('index', { clist: empregos, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de pessoas"})
    })
});
/* GET /contracts: devolve uma lista com todos os contratos; */
router.get('/contracts', function(req, res, next) {
  Empregos.list()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});



/* GET /contracts/:id: devolve o contrato com identificador id; */
/* GET Student page. */
router.get('/contracts/:id', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Empregos.consultar(req.params.id)
    .then(emprego => {
      res.render('pessoa', { a: emprego, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de pessoa"})
    })
});

router.get('/contracts', function(req, res, next) {
  year = req.query.year
  inst = req.query.inst
  if (year != undefined) {
      /* GET /contracts?year=YYYY: devolve a lista dos contratos realizados durante o ano YYYY; */
        Empregos.consultarAno(req.params.year)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
  }
  if (inst != undefined) {
/* GET /contracts?inst=AAA: devolve a lista dos contratos realizados pela instituição contratante AAA;*/
      Empregos.consultarInst(req.params.inst)
        .then(dados => {
          res.render('instituicao', { clist: dados, d: data });
        })
        .catch(erro => res.status(500).jsonp(erro))
  }
});


/* GET /contracts/courses: devolve a lista dos cursos dos contratados (sem repetições);*/
router.get('/contracts/courses', function(req, res, next) {
  Empregos.consultarCursos()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});


/* GET /contracts/institutions: devolve a lista das instituições contratantes (sem repetições);*/
router.get('/contracts/institutions', function(req, res, next) {
  Empregos.consultarInstituicoes()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});


/* POST /contracts: acrescenta um contrato novo à BD;*/
router.post('/contracts', function(req, res, next) {
  Empregos.inserir(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});


/* DELETE /contracts/:id: elimina da BD o contrato com o identificador id.*/
router.delete('/contracts/:id', function(req, res, next) {
  Empregos.eliminar(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});


module.exports = router;
