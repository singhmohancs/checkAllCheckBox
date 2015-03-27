'use strict';

/**
 * @ngdoc function
 * @name checkAllDemoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the checkAllDemoApp
 */
angular.module('checkAllDemoApp')
  .controller('MainCtrl', function($scope) {
    /**
     * Array of checkBoxes
     */
    $scope.checkBoxes = [{
      'title': 'Angular JS'
    }, {
      'title': 'Node JS'
    }, {
      'title': 'Phontom JS'
    }, {
      'title': 'React JS'
    }, {
      'title': 'Mongo DB'
    }, {
      'title': 'Firebase'
    }, {
      'title': 'Express JS'
    }];

    /**
     * Holds checkboxes state
     *
     * While using two way binding
     * should use Objects, not prmitive varibale
     */
    $scope.checkBoxStates = {
      'all_selected': false,
      'no_selected': false
    };

  });