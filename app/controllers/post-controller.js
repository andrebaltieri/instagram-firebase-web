(function () {
    'use strict';

    angular.module('insta').controller('PostCtrl', PostCtrl);

    PostCtrl.$inject = ['$scope', '$rootScope', '$location', '$firebaseArray'];

    function PostCtrl($scope, $rootScope, $location, $firebaseArray) {
        var ref = firebase.database().ref().child("posts");
        $scope.posts = $firebaseArray(ref);

        $scope.filters = ['original', 'grayscale', 'brightness', 'contrast', 'saturate', 'invert', 'sepia'];
        $scope.image = '';
        $scope.croppedImage = '';
        $scope.message = '';

        $scope.post = function (filter) {
            var data = {
                photo: $scope.croppedImage,
                filter: filter,
                message: $scope.message,
                user: $rootScope.user
            };

            $scope.posts.$add(data);

            $scope.image = '';
            $scope.croppedImage = '';
            $scope.message = '';
            $location.path('/');
        };

        var handleFileSelect = function (evt) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function ($scope) {
                    $scope.image = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#file')).on('change', handleFileSelect);
    };
})();
