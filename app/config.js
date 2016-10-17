(function(){
    // Firebase Console > Configurações do Projeto > Adicionar o Firebase no seu app da Web
    var config = {
        apiKey: "AIzaSyA9lyIkL3e9YuvOoKAc-8EpjzYIwsJQqdo",
        authDomain: "firegram-a2526.firebaseapp.com",
        databaseURL: "https://firegram-a2526.firebaseio.com",
        storageBucket: "firegram-a2526.appspot.com",
        messagingSenderId: "964506470352"
    };
    firebase.initializeApp(config);

    angular.module('insta').run(function($rootScope, $location){
        $rootScope.user = null;

        $rootScope.$on("$routeChangeStart", function(event, next, current){
            if($rootScope.user == null){
                $location.path("/login");
            }
        });
    });

})();
