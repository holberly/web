//L'application requiert l'utilisation du module Express.
//La variable express nous permettra d'utiliser les fonctionnalités du module Express.
var express = require('express');

// import module body-parser
var bodyParser = require('body-parser');

// import module des classes
var Profil = require('./modele/Profil.js');

//instanciation Express
var app = express();

// inclusion du plugin pour parser du JSON : échange entre AngularJS et Node.JS
app.use(bodyParser.json());

// on pointe le dossier public pour afficher le projet
app.use(express.static(__dirname + '/public'));

//fonction vérification JSON
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}


/** ROUTAGE **/

//Page d'accueil : par défaut, express affiche index.html

//route en post
// Lorsque l'on fait appel EN POST pour l’URL : http://localhost:3000/api/inscription
app.post('/api/inscription', function(req, res)
{
    //on crée le Profil
    var verif = Profil.creerProfil(req.body.id, req.body.role, req.body.nom, req.body.prenom, req.body.adresse, req.body.email, req.body.tel);
    console.log(verif);
    //si on a 0, c'est que l'id saisi existe déjà
    if(verif==0){
        //message erreur
        res.status(409).json({error: "Ce compte existe déjà."});
    } else{
        //sinon on renvoie à la partie client (AngularJS) sous forme objet json
        res.json(Profil.positionDuProfil(req.body.id));
    }
});

//route en GET
// Lorsque l'on fait appel EN GET pour l’URL : http://localhost:3000/api/connexion/:id
app.get('/api/connexion/:id', function(req, res)
{
    //on cherche la position du Profil
    var verif = Profil.positionDuProfil(req.params.id);
    console.log(verif);
    //si on a null, c'est que le Profil n'existe pas
    if(isEmptyObject(verif)){
        //message erreur
        res.status(409).json({error: "Ce Profil n'existe pas. Veuillez vous inscrire."});
    } else{
        //sinon on renvoie à la partie client (AngularJS) sous forme objet json
        res.json(verif);
    }
});

//route en GET
// Lorsque l'on fait appel EN GET pour l’URL : http://localhost:3000/api/liste/:role
app.get('/api/liste/:role', function(req, res)
{
    //on cherche les différents profils avec req.params.role = Non MIAGiste
    //résultat : tableau contenant des objets JSON
    var verif = Profil.listeRole(req.params.role);

    //si on a un tableau vide
    if(verif.length==0){
        res.json({error: "Plus aucun étudiant non miagiste a validé."});
    }else{
        //sinon on renvoie à la partie client (AngularJS) sous forme objet json
        res.json(verif);
    }

});

//route en PUT
// Lorsque l'on fait appel EN PUT pour l’URL : http://localhost:3000/api/liste/:role
app.put('/api/modifier/:id', function(req, res)
{
    // //on cherche la position du Profil
    var verif = Profil.modifierProfil(req.params.id, req.body.role);

    //si on a un tableau vide
    if(verif==0){
        res.status(409).json({error: "Numéro étudiant inconnu."});
    }else{
        //sinon on renvoie à la partie client (AngularJS) sous forme objet json
        res.json(Profil.positionDuProfil(req.params.id));
    }

});

//lancement de Node.JS
app.listen(3000, function () {
    console.log('Go sur http://localhost:3000/ ! ') ;
}) ;