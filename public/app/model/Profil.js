var profils = [];

function Profil(id, role, nom, prenom, adresse, mail, telephone){
    this.id = id;
    this.role = role;
    this.nom = nom;
    this.prenom = prenom;
    this.adresse = adresse;
    this.mail = mail;
    this.tel = telephone;
}

/**
 * Méthode permettant de créer un profil, et de verifier si il n'est pas déjà créé
 * @param role
 * @param nom
 * @param prenom
 * @param adresse
 * @param mail
 * @param telephone
 * @returns {number} 1 si le profil est créé, 0 si l'adresse mail est déjà utilisée
 */
var createProfil = function(role,nom,prenom,adresse,mail,telephone){
    var id = 1;
    var findMail = false;
    for(var i=1;i<profils.length;i++){
        if(profils[i].mail===mail){
            findMail = true;
        }
    }
    if(findMail===false){
        if(profils.length!==undefined){
            id=profils.length+1;
        }
        profils.push(new Profil(id, role, nom, prenom, adresse, mail, telephone));
        return id;
    }else{

        return "fail";
    }
};

/**
 * Méthode retournant tous les profils correspondant au rôle demandé
 * @param role
 * @returns {Array} liste des profils ayant le rôle demandé
 */
var getlistProfil = function(role){
    var liste = [];
    for(var i=0;i<profils.length;i++){
        if(profils[i].role===role){
            liste.push(profils[i]);
        }
    }
    return liste;
};


var updateProfil = function(){

};

//export fonctions
exports.createProfil = createProfil;
exports.updateProfil = updateProfil;
exports.getlistProfil = getlistProfil;