//création du module et permet d'injecter ngRoute
var miageApp = angular.module('miageApp', ['ngRoute', 'ngDialog', 'ngCookies']);

//configuration des routes
miageApp.config(function($routeProvider) {
    $routeProvider
    //route pour la page d'accueil
        .when('/', {
            templateUrl : '/home.html',
            controller  : 'mainController',
            resolve:{
                anchorname:function(){
                    return 'Presentation';
                }
            }
        })

        //route pour la page concernant les formations
        .when('/formation', {
            templateUrl : 'views/home.html',
            controller  : 'mainController',
            resolve:{
                anchorname:function(){
                    return 'Formation';
                }
            }
        })

        //route pour la page concernant l'alternance
        .when('/alternance', {
            templateUrl : 'views/home.html',
            controller  : 'mainController',
            resolve:{
                anchorname:function(){
                    return 'Alternance';
                }
            }
        })

        //route pour la page des contacts
        .when('/contact', {
            templateUrl : 'views/contact.html',
            controller  : 'contactController'
        })

        .when('/signin',{
            template: ' ',
            controller : 'signinController'
        })

        .when('/listeprofil',{
            templateUrl: 'views/listeProfils.html',
            controller : 'listeProfilsController'
        })

        //si une autre URL est demandée alors on va rediriger vers la page d'accueil
        .otherwise({
            redirectTo: '/home'
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

miageApp.controller('signinController', function ($scope, ngDialog) {
    $scope.test = 'test';
    $scope.clickToSignIn = function(){
        ngDialog.open({
            template : 'views/inscription.html'
        });
    };
});

miageApp.controller('loginController', function ($scope) {

});

miageApp.controller('menuController', function($scope, $cookieStore){
    $scope.private = function(){
        return $cookieStore.get("authorisation")!=='user';
    };
    $scope.connected = function(){
        return $cookieStore.get("connected")!=="true";
    };
});

miageApp.controller('listeProfilsController', function($scope, $http){
    /// ATTENTION METTRE LIEN NODEJS
    /*$http.get("lien nodeJS").then(function(response) {
        $scope.profils = response.data;
    });*/
    $scope.profils = {
        "profils": [
            {
                "prenom": "b",
                "adresse": "d",
                "mail": "f"
            },
            {
                "prenom": "b",
                "adresse": "d",
                "mail": "f"
            }
        ]
    };
});