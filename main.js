//L'application requiert l'utilisation du module Express.
//La variable express nous permettra d'utiliser les fonctionnalités du module Express.
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// inclusion du plugin pour parser du JSON : échange entre AngularJS et Node.JS
app.use(bodyParser.json());

// on pointe le dossier public pour afficher le projet
app.use(express.static(__dirname + '/public'));

var Profil = require('./public/app/model/Profil.js');
var Offre = require('./public/app/model/Offre.js');
var Message = require('./public/app/model/Message.js');

//fonction vérification JSON
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

app.post('/api/inscription', function(req, res)
{
    var profil = Profil.createProfil(req.body.role, req.body.nom, req.body.prenom, req.body.adresse, req.body.mail,req.body.tel);
    if(profil!=="fail"){
        res.json({"role":req.body.role, "id":profil});
    }else{
        res.status(409).json({error: "Ce Profil n'existe pas. Veuillez vous inscrire."});
    }
});

app.get('/api/login/:mail', function(req,res){
    var isCorrect = Profil.findEmail(req.params.mail);
    console.log("b"+isCorrect);
    if(isCorrect!="nothing"){
        res.json(isCorrect);
    }else{
        res.status(409).json({error: "Adresse mail invalide"});
    }
});

app.get('/api/listeprofils', function(req,res){
    var isCorrect = Profil.getlistProfil();
    if(isCorrect.length!==0){
        res.json(isCorrect);
    }else{
        res.status(409).json({error: "Aucun profil est disponible"});
    }
});

app.put('/api/changerRole', function(req,res){
    var isCorrect = Profil.validateProfilMiagiste(req.body.id);
    if(isCorrect==0){
        res.json(isCorrect);
    }else{
        res.status(409).json({error: "Le rôle du profil n'a pas pu être changé."});
    }
});

app.post('/api/offre/submit', function(req,res){
    var isCorrect = Offre.createOffre(req.body.type, req.body.societe, req.body.sujet, req.body.adresse, req.body.mail, req.body.tel);
    console.log(req.body.type+req.body.societe+req.body.sujet+req.body.adresse+req.body.mail+req.body.tel);
    if(isCorrect==0){
        res.json(isCorrect);
    }else{
        res.status(409).json({error: "L'offre n'a pas pu être enregistrée."});
    }
});

app.get('/api/offre', function(req,res){
    var isCorrect = Offre.getOffre();
    if(isCorrect.length!==0){
        res.json(isCorrect);
    }else{
        res.status(409).json({error: "Aucune offre"});
    }
});

app.get('/api/profil/entreprise', function(req,res){
    var isCorrect = Profil.getProfilEntreprise();
    if(isCorrect.length!==0){
        res.json(isCorrect);
    }else{
        res.status(409).json({error: "Aucun profil entreprise"});
    }
});

app.post("/api/message/create", function(req,res){
    var datetime = new Date();
    var isCorrect = Message.createMessage(req.body.auteur, datetime, req.body.contenu.toString());
    if(isCorrect==0){
        res.json(isCorrect);
    }else{
        res.status(409).json({error: "La question n'a pas pu être envoyée."});
    }
});

app.put("/api/message/answer", function(req,res){
    var isCorrect = Message.answerMessage(req.body.id, req.body.reponse);
    console.log("a"+req.body.id+"b"+req.body.reponse);
    console.log("c"+isCorrect);
    if(isCorrect==0){
        res.json(isCorrect);
    }else{
        res.status(409).json({error: "La réponse n'a pas pu être envoyée."});
    }
});

app.get('/api/message/:id', function(req,res){
    var datetime = new Date();
    var isCorrect = Message.getMessages(req.params.id);
    if(isCorrect.length!==0){
        res.json(isCorrect);
    }else{
        res.status(409).json({error: "Aucune question envoyée pour l'instant."});
    }
});

app.get('/api/question/', function(req, res){
    var isCorrect = Message.getMessageWithoutAnswer();
    if(isCorrect.length!==0){
        console.log(isCorrect[0].contenu);
        res.json(isCorrect);
    }else{
        res.status(409).json({error: "On va tester car ça me soule"});
    }
});

app.listen(3000, function () {
    console.log('Go sur http://localhost:3000/ ! ');
});