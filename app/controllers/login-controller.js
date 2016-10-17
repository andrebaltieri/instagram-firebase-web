(function() {
    'use strict';

    angular.module('insta').controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$rootScope', '$location', '$firebaseAuth'];

    function LoginCtrl($scope, $rootScope, $location, $firebaseAuth) {
        var auth = $firebaseAuth();

        $scope.facebookLogin = doFacebookLogin;
        $scope.logout = logout;

        function doFacebookLogin(){
            auth.$signInWithPopup("facebook").then(function(firebaseUser) {
                // console.log(firebaseUser);
                $rootScope.user = {
                    name: firebaseUser.user.displayName,
                    email: firebaseUser.user.email,
                    image: firebaseUser.user.photoURL
                };
                $location.path('/');
                // $scope.$apply();
            }).catch(function(error) {
                console.log("Authentication failed:", error);
            });

        }

        function logout() {
            auth.$signOut();
            $rootScope.user = null;
            $location.path('/login');
        }
    };
})();
