var app = angular.module('app', []);

app.controller('related', function($scope) {
    $scope.filters = { };
    
    $scope.links = [
        {name: 'Apple', category: 'Fruit'},
        {name: 'Pear', category: 'Fruit'},
        {name: 'Almond', category: 'Nut'},
        {name: 'Mango', category: 'Fruit'},
        {name: 'Cashew', category: 'Nut'}
    ];
});