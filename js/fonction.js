//function ouvre_popup(page) {
  //  window.open(page,"nom_popup","menubar=no, status=no, scrollbars=no, menubar=no, width=200, height=100");
//}


function PopupCentrer(page, largeur, hauteur, options) {
    var top=(screen.height-hauteur)/2;
    var left=(screen.width-largeur)/2;
    window.open(page,"Connexion","top="+top+",left="+left+",width="+largeur+",height="+hauteur+","+options);
}
