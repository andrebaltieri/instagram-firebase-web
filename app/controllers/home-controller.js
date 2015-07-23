(function () {
    'use strict';
    angular.module('insta').controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', 'APP_SETTINGS', '$firebaseArray'];

    function HomeCtrl($scope, APP_SETTINGS, $firebaseArray) {
        var vm = this;
        var ref = new Firebase(APP_SETTINGS.FIREBASE_URL + '/posts');
        ref.orderByKey().limitToLast(25);

        vm.posts = [];

        activate();

        function activate() {
            vm.posts = $firebaseArray(ref);
        }

        ref.child("messages").orderByKey().limitToLast(6).on("child_added", function(snapshot) {
            vm.posts.push(angular.fromJson(snapshot.val()));
        });
    }
})();