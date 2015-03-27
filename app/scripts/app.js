'use strict';

/**
 * @ngdoc overview
 * @name checkAllDemoApp
 * @description
 * # checkAllDemoApp
 *
 * Main module of the application.
 */
angular
  .module('checkAllDemoApp', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  /**
 * @ngdoc object
 * @name checkAllDemoApp.directive.selectAllCheckbox
 * @module checkAllDemoApp
 *
 * @description
 * A directive to select/unselect all checkboxes
 * Create a master checkbox
 *
 * @param {Object} checkboxes Child checkboes list model
 * @param {Object} allSelected A flag model to check if all selected
 * @param {Object} allclear A flag model to check if all unselected
 *
 * Usage ::
 * <select-all-checkbox checkboxes="ListOfItems" all-selected="AllSelectedItems" all-clear="NoSelectedItems">
 * </select-all-checkbox>
 *
 * @attribute checkboxes="ListOfItems" is mandetory to set.
 * ListOfItems list of all child checkboxes
 *
 * @attribute all-selected="AllSelectedItems"
 * AllSelectedItems a flag to set false in your controller by default
 *
 * @attribute all-clear="NoSelectedItems"
 * NoSelectedItems a flag to set false in your controller by default
 *
 * @author Mohan Singh ( gmail::singhmohancs@gmail.com, skype :: mohan.singh42 )
 * @returns {Object}  an object (called the directive definition object)
 */

'use_strict';
(function() {
  /**
   * Getter for checkAllDemoApp module
   */
  angular
    .module('checkAllDemoApp')
  /**
   * Register a directive named selectAllCheckbox
   * Isolate scope is used by Directive to make it independent from parent's scope
   * Directive is restrcited to "E" which means directive can only be used as an element
   */
  .directive('selectAllCheckbox', [

    function() {
      return {
        replace: true,
        restrict: 'E',
        scope: {
          checkboxes: '=',
          allselected: '=allSelected',
          allclear: '=allClear'
        },
        template: ['<label style="font-weight:normal;cursor:pointer">',
          '<span ng-show="allclear">Select all</span>',
          '<span ng-show="!allclear">Unselect all</span>',
          '<input type="checkbox" ng-model="master" ng-change="masterChange()" />',
          '</lable>'
        ].join(" "),
        controller: function($scope, $element) {
          /**
           * Triggered when master checkbox state get change
           * Two-way binding with master model which get changes when checkbox state is changes
           * if master model is true then all child checkbox would be selected else deselect
           *
           * @author Mohan Singh ( gmail::singhmohancs@gmail.com, skype :: mohan.singh42 )
           * @return {void}
           * @public
           */
          $scope.masterChange = function() {
            $scope.master ? _selectAll() : _unSelectAll();
          };
          /**
           * Select all child checkBoxes
           * sets property isSelected = true to every child checkbox
           *
           * @author Mohan Singh ( gmail::singhmohancs@gmail.com, skype :: mohan.singh42 )
           * @return  {Void}
           * @private
           */
          var _selectAll = function() {
            angular.forEach($scope.checkboxes, function(cb, index) {
              cb.isSelected = true;
            });
          };
          /**
           * Unselect all child checkBoxes
           * sets property isSelected = false to every child checkbox
           *
           * @author Mohan Singh ( gmail::singhmohancs@gmail.com, skype :: mohan.singh42 )
           * @return  {Void}
           * @private
           */
          var _unSelectAll = function() {
            angular.forEach($scope.checkboxes, function(cb, index) {
              cb.isSelected = false;
            });
          };
          /**
           * Keep eyes on model checkboxes for any update
           *
           * @author Mohan Singh ( gmail::singhmohancs@gmail.com, skype :: mohan.singh42 )
           * @return {Void}
           */
          $scope.$watch('checkboxes', function() {
            var allSet = true,
              allClear = true;

            angular.forEach($scope.checkboxes, function(cb, index) {
              if (cb.isSelected) {
                allClear = false;
              } else {
                allSet = false;
              }
            });

            if ($scope.allselected !== undefined) {
              $scope.allselected = allSet;
            }
            if ($scope.allclear !== undefined) {
              $scope.allclear = allClear;
            }

            $element.find('input[type="checkbox"]').prop('indeterminate', false);
            if (allSet) {
              $scope.master = true;
            } else if (allClear) {
              $scope.master = false;
            } else {
              $scope.master = false;
              $element.find('input[type="checkbox"]').prop('indeterminate', true);
            }
          }, true);
        }
      };
    }
  ]);
})();