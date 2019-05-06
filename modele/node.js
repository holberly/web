//liste des profils
var listeProfils = {};

//Constructeur pour les PositionsProfil
function PositionProfil(id, role, nom, prenom, adresse, email, tel)
{
    //id du profil
    this.id = id;
    //le role
    this.role = role;
    //le nom
    this.nom = nom;
    //le prenom
    this.prenom = prenom;
    //l'adresse
    this.adresse = adresse;
    //le mail
    this.email = email;
    //le tel
    this.tel = tel;
    //Date de creation du profil
    this.date = new Date() ;
}

// Constructeur pour les Profils
function Profil(id, role, nom, prenom, adresse, email, tel)
{
    //la position d'un profil
    this.position = new PositionProfil(id, role, nom, prenom, adresse, email, tel);

    //modification d'une information
    this.modifier = function(role){
        this.position.role = role;
        this.position.date = new Date () ;
    }
}

var creerProfil = function (id, role, nom, prenom, adresse, email, tel) {
    //On verifie que l'acteur n'existe pas deja
    if( typeof listeProfils[id] === 'undefined' ) {
        //si c'est le cas on l'ajoute
        listeProfils[id] = new Profil(id, role, nom, prenom, adresse, email, tel);
        console.log(listeProfils[id]);
        //renvoie 1 si c'est OK
        return 1;
    }
    //renvoie 0 si déjà présent
    return 0;
}

var modifierProfil = function (id, role) {
    //on verifie que l'acteur existe
    if ( typeof listeProfils[id] === 'undefined' ) {
        return 0;
    }
    listeProfils[id].modifier(role);
    return 1 ;
}

// pour connaitre la position d'un profil existant
var positionDuProfil = function(id) {
    //console.log(listeProfils);
    // s'il n'existe pas
    if (typeof listeProfils[id] === 'undefined')
        return {};
    return listeProfils[id].position;
}

// pour connaitre la position d'un profil existant par son role
var listeRole = function(unRole) {
    // console.log("listeProfils : "+listeProfils);
    var liste = [];
    // console.log(listeProfils[0]);
    for(var unId in listeProfils){
        if(listeProfils[unId]['position'].role === unRole){
            // console.log("ok");
            liste.push(listeProfils[unId]['position']);
        }
    }
    return liste;
}

// fonctions exportées
exports.creerProfil = creerProfil;
exports.modifierProfil = modifierProfil;
exports.positionDuProfil = positionDuProfil;
exports.listeRole = listeRole;