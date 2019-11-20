var messages = [];

/**
 * Constructeur d'un message sans réponse
 * @param id
 * @param id_auteur
 * @param horadatage_msg
 * @param contenu
 */
function message(id, id_auteur, horadatage_msg, contenu){
    this.id = id;
    this.auteur = id_auteur;
    this.horadatage_msg = horadatage_msg;
    this.contenu = contenu;
    this.reponse = "Aucun réponse n'a été apportée à votre message pour l'instant.";
}

/**
 * Permet de créer un message sans réponse
 * @param id_auteur
 * @param horadatage_msg
 * @param contenu
 * @returns {number} 0 si le message a été créé, 1 si le message n'a pas été créé
 */
var createMessage = function(id_auteur, horadatage_msg, contenu){
    if(messages.length==undefined){
        messages[0]= new message(0,id_auteur, horadatage_msg, contenu);
    }else{
        messages[messages.length]= new message(messages.length,id_auteur, horadatage_msg, contenu);
    }
    return 0;
};


/**
 * Permet de répondre à un message
 * @param id
 * @param reponse
 * @returns {number} 0 si la réponse a été ajoutée, 1 si la réponse n'a pas été ajoutée
 */
var answerMessage = function(id,reponse){
    console.log("taille"+messages.length);
    for(var i = 0;i<messages.length;i++){
        console.log("ok");
        if(messages[i].id==id){
            console.log("ok2");
            messages[i].reponse = reponse;
            return 0;
        }
    }
    return 1;
};

/**
 * Permet de retourner tous les messages sans réponse
 * @returns {Array} messages sans réponse
 */
var getMessageWithoutAnswer = function(){
    var liste = [];
    for(var i = 0;i<messages.length;i++){
        if(messages[i].reponse=="Aucun réponse n'a été apportée à votre message pour l'instant."){
            liste.push(messages[i]);
        }
    }
    return liste;
};

/**
 * Permet de retourner tous les messages d'un certain auteur
 * @param id auteur
 * @returns {Array} messages de l'auteur
 */
var getMessages = function(id){
    var liste = [];
    for(var i = 0;i<messages.length;i++){
        if(messages[i].auteur==id){
            liste.push(messages[i]);
        }
    }
    return liste;
};

//export fonctions
exports.createMessage = createMessage;
exports.answerMessage = answerMessage;
exports.getMessageWithoutAnswer = getMessageWithoutAnswer;
exports.getMessages = getMessages;