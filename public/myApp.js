//création du module et permet d'injecter ngRoute
var miageApp = angular.module('miageApp', ['ngRoute', 'ngDialog', 'ngCookies']);

//configuration des routes
miageApp.config(function($routeProvider) {
    $routeProvider
    //route pour la page d'accueil
        .when('/', {
            templateUrl : '/views/home.html',
            controller  : 'mainController',
            resolve:{
                anchorname:function(){
                    return 'Presentation';
                }
            }
        })

        //route pour la page concernant les formations
        .when('/formation', {
            templateUrl : '/views/home.html',
            controller  : 'mainController',
            resolve:{
                anchorname:function(){
                    return 'Formation';
                }
            }
        })

        //route pour la page concernant l'alternance
        .when('/alternance', {
            templateUrl : '/views/home.html',
            controller  : 'mainController',
            resolve:{
                anchorname:function(){
                    return 'Alternance';
                }
            }
        })

        //route pour la page des contacts
        .when('/contact', {
            templateUrl : '/views/contact.html',
            controller  : 'contactController'
        })

        .when('/signin',{
            template: ' ',
            controller : 'signinController'
        })

        .when('/offres',{
            templateUrl: '/views/offres.html',
            controller : 'offresController'
        })

        .when('/ajouterOffre',{
            templateUrl: '/views/ajoutOffre.html',
            controller : 'ajouterOffreController'
        })

        .when('/messages',{
            templateUrl: '/views/listeMessages.html',
            controller : 'messagesController'
        })

        .when('/mesQuestions',{
            templateUrl: '/views/listeQuestions.html',
            controller : 'questionsController'
        })

        .when('/listeprofil',{
            templateUrl: '/views/listeProfils.html',
            controller : 'listeProfilsController'
        })

        //si une autre URL est demandée alors on va rediriger vers la page d'accueil
        .otherwise({
            redirectTo: '/'
        })
});

//création des controllers et injecte le scope d'angular
miageApp.controller('mainController', function($scope, $location, $anchorScroll, anchorname) {
    //envoie l'utilisateur vers l'anchor de la page (présentation, formation, alternance)
    $location.hash(anchorname);
    $anchorScroll();
});

miageApp.controller('contactController', function($scope) {

});

miageApp.controller('signinController', function ($scope, $http, $cookieStore, ngDialog) {
    $scope.signIn = function(user) {
        if (typeof user.role === undefined || typeof user.nom === undefined || typeof user.prenom === undefined ||
            typeof user.adresse === undefined || typeof user.mail === undefined || typeof user.tel === undefined) {
            ngDialog.open({
                template: '../views/erreur.html'
            });
        } else {
            $http.post('/api/inscription', user).then(function onSuccess(response) {
                $cookieStore.put("connected", "true");
                $cookieStore.put("id", response.data.id);
                $cookieStore.put("role", response.data.role);
                console.log(response.data);
                console.log(response.data.role);
                console.log($cookieStore.get("role"));
                ngDialog.closeAll();
            }).catch(function onError(response) {
                ngDialog.closeAll();
                ngDialog.open({
                    template: '../views/erreur.html'
                });
            });
        }
    };
    $scope.clickToLogIn = function(){
        console.log("test");
        ngDialog.closeAll();
        //ouvre la pop-up
        ngDialog.open({
            template : '../views/connexion.html'
        });
    };
});

miageApp.controller('loginController', function ($scope, $cookieStore, ngDialog, $http) {
    $scope.login = function(user) {
        var config = {
            params: user.mail,
            headers : {'Accept' : 'application/json'}
        };
        //gheto
        $http.get('/api/login/'+user.mail).then(function onSuccess(response) {
            console.log("ok"+response.data.role);
            $cookieStore.put("connected", "true");
            $cookieStore.put("id", response.data.id);
            $cookieStore.put("role", response.data.role);
            console.log(response.data.role);
            console.log($cookieStore.get("role"));
            ngDialog.closeAll();
        }).catch(function onError(response){
            console.log("pas ok");
            ngDialog.closeAll();
            ngDialog.open({
                template : '../views/error.html'
            });
        });
    };
    //fonction pour ouvrir la pop-up d'inscription
    $scope.clickToSignIn = function(){
        ngDialog.closeAll();
        //ouvre la pop-up
        ngDialog.open({
            template : '../views/inscription.html'
        });
    };
});

miageApp.controller('menuController', function($scope, $cookieStore, $location, ngDialog){
    $scope.private = function(){
        return $cookieStore.get("role")==='collaborateur';
    };
    $scope.connected = function(){
        return $cookieStore.get("connected")==="true";
    };
    $scope.miagiste = function(){
        return $cookieStore.get("role")=="miagiste";
    };
    $scope.pageOffre = function(){
        return ($cookieStore.get("role")=='collaborateur' || $cookieStore.get("role")=='entreprise');
    };

    $scope.deconnexion = function(){
        if($cookieStore.get("connected")==="true"){
            $cookieStore.remove("role");
            $cookieStore.remove("id");
            $cookieStore.remove("connected");
        }
        //envoie vers l'index
        $location.path('view/index.html');
    };
    $scope.login = function(){
        ngDialog.open({
            template : '/views/connexion.html'
        });
    };
});

miageApp.controller('listeProfilsController', function($scope, $http, $route){
    $http.get("/api/listeprofils").then(function(response) {
        $scope.profils = response.data;
    });
    $scope.changerRole=function(id){
        $http.put('/api/changerRole', {"id":id}).then(function onSuccess(response) {
            $route.reload();
        }).catch(function onError(response) {
            console.log("erreur"+response);
            ngDialog.open({
                template: '../views/erreur.html'
            });
        });
    };
    $scope.changerRoleEntreprise=function(id){

        $http.put('/api/profil/changerRoleEntreprise', {"id":id}).then(function onSuccess(response) {
            console.log("test");
            $route.reload();
        }).catch(function onError(response) {
            console.log("erreur"+response);
            ngDialog.open({
                template: '../views/erreur.html'
            });
        });
    };
    $http.get("/api/profil/entreprise").then(function(response) {
        $scope.profilEntreprise = response.data;
    });
});

miageApp.controller('offresController', function($scope, $http) {
    $http.get("/api/offre").then(function(response) {
        $scope.offres = response.data;
    });
});

miageApp.controller('messagesController', function($scope, $http, $route) {
    console.log("ok");
    $http.get('/api/question/').then(function(response) {
        console.log(response.toString());
        console.log(response.data.toString());
        $scope.messagesARepondre = response.data;
    });
    $scope.submitAnswer = function(item, reponse){
        console.log(item.id);
        console.log(reponse);
        $http.put('/api/message/answer', {"id": item.id, "reponse":reponse}).then(function onSuccess(response) {
            console.log("ok");
            $route.reload();
        }).catch(function onError(response) {
            console.log("pas ok");
            ngDialog.open({
                template: '../views/erreur.html'
            });
        });
    }
});


miageApp.controller('questionsController', function($scope, $http, $cookieStore, $route, ngDialog) {
    var ok = $cookieStore.get("id");
    $http.get('/api/message/'+ok).then(function(response) {
        $scope.messages = response.data;
    });
    $scope.submitQuestion = function(contenu){
        var id_author = $cookieStore.get("id");
        console.log(contenu);
        $http.post('/api/message/create', {contenu : contenu, "auteur": id_author}).then(function onSuccess(response) {
            console.log("ok");
            $route.reload();
        }).catch(function onError(response) {
            console.log("pas ok");
            ngDialog.open({
                template: '../views/erreur.html'
            });
        });
    };
});

miageApp.controller('ajouterOffreController', function($scope, $http, $route, ngDialog) {
    $scope.submitOffer = function(offre){
        $http.post('/api/offre/submit', offre).then(function onSuccess(response) {
            console.log("ok");
            $route.reload();
        }).catch(function onError(response) {
            console.log("pas ok");
            ngDialog.open({
                template: '../views/erreur.html'
            });
        });
    };
});