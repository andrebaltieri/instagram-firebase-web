(function () {
    'use strict';
    angular.module('insta').controller('PostCtrl', PostCtrl);

    PostCtrl.$inject = ['$scope', '$rootScope', '$location', 'APP_SETTINGS'];

    function PostCtrl($scope, $rootScope, $location, APP_SETTINGS) {
        var vm = this;
        var ref = new Firebase(APP_SETTINGS.FIREBASE_URL + '/posts');

        vm.filters = ['original', 'grayscale', 'brightness', 'contrast', 'saturate', 'invert', 'sepia'];
        vm.image = '';
        vm.croppedImage = '';
        vm.message = '';

        $scope.post = function (filter) {
            var data = {
                photo: vm.croppedImage,
                filter: filter,
                message: vm.message,
                user: $rootScope.user
            };

            ref.push(data);

            vm.image = '';
            vm.croppedImage = '';
            vm.message = '';
            $location.path('/');
        };

        var handleFileSelect = function (evt) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function ($scope) {
                    vm.image = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#file')).on('change', handleFileSelect);
    }
})();