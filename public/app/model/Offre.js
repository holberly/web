var offres = [];

function Offre(id, type, nom_societe, sujet, adresse, mail_contact, tel_contact){
    this.id = id;
    this.type = type; //stage ou alternance
    this.nom_societe = nom_societe;
    this.sujet = sujet;
    this.adresse = adresse;
    this.mail_contact = mail_contact;
    this.tel_contact = tel_contact;
}

var createOffre = function(type, nom_societe, sujet, adresse, mail_contact, tel_contact){
    offres.push(new Offre([offres.length], type, nom_societe, sujet, adresse, mail_contact, tel_contact));
    return 0;
};

var getOffre = function(){
    return offres;
};


//exports
exports.createOffre = createOffre;
exports.getOffre = getOffre;


