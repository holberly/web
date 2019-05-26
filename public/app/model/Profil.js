var profils = [];

/**
 * Constructeur de Profil
 * @param id du profil
 * @param role du profil (non_miagiste, miagiste, collaborateur, entreprise)
 * @param nom du profil
 * @param prenom du profil
 * @param adresse du profil
 * @param mail du profil
 * @param telephone du profil
 * @constructor
 */
function Profil(id, role, nom, prenom, adresse, mail, telephone, entreprise){
    this.id = id;
    this.role = role;
    this.nom = nom;
    this.prenom = prenom;
    this.adresse = adresse;
    this.mail = mail;
    this.tel = telephone;
    this.entreprise = entreprise;
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
        entreprise = false;
        if(role=="entreprise"){
            role = "non_miagiste";
            entreprise = true;
        }
        profils.push(new Profil(id, role, nom, prenom, adresse, mail, telephone, entreprise));
        console.log(profils[0].role);
        return id;
    }else{
        return 1;
    }
};

/**
 * Méthode retournant tous les profils correspondant au rôle demandé
 * @param role
 * @returns {Array} liste des profils ayant le rôle demandé
 */
var getlistProfil = function(){
    var liste = [];
    for(var i=0;i<profils.length;i++){
        if(profils[i].role==="non_miagiste" && profils[i].entreprise==false){
            liste.push(profils[i]);
        }
    }
    return liste;
};


/**
 * Méthode permettant de passer un compte non_miagiste à un compte entreprise
 * @param id du profil à mettre à jour
 * @returns {number} 0 si le profil a été mis à jour, 1 si aucun profil n'a été mis à jour
 */
var validateProfilEntreprise = function (id) {
    for(var i=0;i<profils.length;i++){
        if(profils[i].id==id){
            profils[i].role = "entreprise";
            return 0;
        }
    }
    return 1;
};

/**
 * Méthode permettant de passer un compte non_miagiste à un compte miagiste
 * @param id du profil à mettre à jour
 * @returns {number} 0 si le profil a été mis à jour, 1 si aucun profil n'a été mis à jour
 */

var validateProfilMiagiste = function (id) {
    for(var i=0;i<profils.length;i++){
        if(profils[i].id==id){
            profils[i].role = 'miagiste';
            return 0;
        }
    }
    return 1;
};


var findEmail = function(email){
    for(var i=0;i<profils.length;i++){
        if(profils[i].mail==email){
            return profils[i];
        }
    }
    return "nothing";
};

var getProfilEntreprise = function(){
    var liste = [];
    for(var i=0;i<profils.length;i++){
        if(profils[i].entreprise==true && profils[i].role!="entreprise"){
            liste.push(profils[i]);
        }
    }
    return liste;
};


//export fonctions
exports.createProfil = createProfil;
exports.getlistProfil = getlistProfil;
exports.validateProfilEntreprise= validateProfilEntreprise;
exports.validateProfilMiagiste = validateProfilMiagiste;
exports.findEmail = findEmail;
exports.getProfilEntreprise = getProfilEntreprise;