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

app.get('/api/login', function(req,res){
    var isCorrect = Profil.findEmail(req.body.mail);
    if(isCorrect==="true"){
        res.json(isCorrect);
    }else{
        res.status(409).json({error: "Adresse mail invalide"});
    }
});

app.get('/api/listeprofils', function(req,res){
    var isCorrect = Profil.getlistProfil("non_miagiste");
    if(isCorrect.length!==0){
        res.json(isCorrect);
    }else{
        res.status(409).json({error: "Aucun profil est disponible"});
    }
});

app.listen(3000, function () {
    console.log('Go sur http://localhost:3000/ ! ');
});