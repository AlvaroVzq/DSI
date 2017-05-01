// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
 $stateProvider
   .state('app', {
   url: "/app",
   abstract: true,
   templateUrl: "menu.html",
 })
 .state('app.about', {
   url: "/about",
   views: {
     'menuContent': {
       templateUrl: "about.html"
     }
   }
 })
 .state('app.explore', {
     url: "/explore",
     views: {
       'menuContent': {
         templateUrl: "explore.html"
       }
     }
   })
   .state('app.home', {
     url: "/home",
     views: {
       'menuContent': {
         templateUrl: "home.html",
       }
     }
   });
 // Fallback
 $urlRouterProvider.otherwise('/app/home');
})

.controller('MyCtrl', function($scope, $ionicModal, $ionicPopover, $http){
  $http.get("data.json").then(function(response) {
        $scope.myData = response.data;
    });
  $scope.openModal = function(obj) {
      $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modalobj = obj;
        $scope.modaltitle = obj.title;
        $scope.modalimg = obj.img;
        $scope.modalbody = obj.body;
        modal.show();
      });
  };
  $scope.closeModal = function() {

    $scope.modal.hide();
    $scope.modal.remove();
    $scope.closePopover();
  };

  $scope.openPopover = function($event,obj) {
    $ionicPopover.fromTemplateUrl('popover.html', {
      scope: $scope
    }).then(function(popover){
      $scope.popover = popover;
      $scope.popovertitle = obj.title;
      $scope.popover.show($event);
    });
  };
   $scope.closePopover = function() {
      $scope.popover.hide();
      $scope.popover.remove();
  };

});


