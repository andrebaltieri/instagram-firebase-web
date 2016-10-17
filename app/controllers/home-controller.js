(function () {
    'use strict';

    angular.module('insta').controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$firebaseArray'];

    function HomeCtrl($scope, $firebaseArray) {
        $scope.posts = [];

        var ref = firebase.database().ref().child("posts").orderByKey().limitToLast(25);

        activate();

        function activate() {
            $scope.posts = $firebaseArray(ref);
        }
    };
})();
