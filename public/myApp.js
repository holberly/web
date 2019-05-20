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

        .when('/listeprofil',{
            templateUrl: '/listeProfils.html',
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
        $http.post('/api/inscription', user).then(function onSuccess(response) {
            $cookieStore.put("connected", "true");
            $cookieStore.put("id", response.data.id);
            $cookieStore.put("role", response.data.role);
        }).catch(function onError(response) {
            ngDialog.closeAll();
            ngDialog.open({
                template : '../views/error.html'
            });
        });
    };
});

miageApp.controller('loginController', function ($scope, $cookieStore, ngDialog) {
    $scope.login = function(user) {
        $http.get('/api/login', user).then(function onSuccess(response) {
            $cookieStore.put("connected", "true");
            $cookieStore.put("id", response.data.id);
            $cookieStore.put("role", response.data.role);
            ngDialog.closeAll();
        }).catch(function onError(response){
            ngDialog.closeAll();
            ngDialog.open({
                template : '../views/error.html'
            });
        });
    };
});

miageApp.controller('menuController', function($scope, $cookieStore, $location, ngDialog){
    $scope.private = function(){
        return $cookieStore.get("authorisation")==='user';
    };
    $scope.connected = function(){
        return $cookieStore.get("connected")==="true";
    };
    //fonction pour ouvrir la pop-up d'inscription
    $scope.clickToSignIn = function(){
        //stock un cookie pour détecter que l'utilisateur est connecté
        //ouvre la pop-up
        ngDialog.open({
            template : '../views/inscription.html'
        });
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

miageApp.controller('listeProfilsController', function($scope, $http){
    /// ATTENTION METTRE LIEN NODEJS
    $http.get("/api/profilListe",{"role":"non_miagiste"}).then(function(response) {
        console.log(response.data);
    });
});