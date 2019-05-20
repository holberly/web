var messages = {};

function message(id, id_auteur, horadatage_msg, contenu){
    this.id = id;
    this.id_auteur = id_auteur;
    this.horadatage_msg = horadatage_msg;
    this.contenu = contenu;
    this.reponse = "Aucune réponse n'a été apportée au message";
}

var createMessage = function(id_auteur, horadatage_msg, contenu){
    messages[messages.length]= new message(messages.length,id_auteur, horadatage_msg, contenu);
};

var answerMessage = function(){

};

var getMessageWithoutAnswer = function(){
    var liste = [];
    for(var i = 0;i<messages.length;i++){
        if(messages[i].reponse==="Aucune réponse n'a été apportée au message"){
            liste.push(messages[i]);
        }
    }
    return liste;
};

var getMessages = function(id){
    var liste = [];
    for(var i = 0;i<messages.length;i++){
        if(messages[i].id_auteur===id){
            liste.push(messages[i]);
        }
    }
    return liste;
};

//export fonctions
exports.createMessage = createMessage;
exports.answerMessage = answerMessage;
exports.getMessageWithoutAnswer = getMessageWithoutAnswer;
exports.getMessges = getMessages;