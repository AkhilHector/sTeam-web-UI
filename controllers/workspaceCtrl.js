angular.module("steam")

.controller("grouplistCtrl", ["$scope", function ($scope) {

}])

.controller("workspaceCtrl", ["$rootScope", "$scope", "handler", "ngAudio", "video", function($rootScope, $scope, handler, ngAudio, video){
      $rootScope.user = handler.user().id;
      handler.get("/home/" + $rootScope.user).then(function(response) {

      $scope.data = response;

      $scope.items = $scope.data.inventory;

      // Image
      $scope.image = {
            "src" : "",
            "description" : ""
      }

      // Audio
      $scope.audio = ngAudio.load("");

      // Video
      $scope.video.addSource("", "");

})
}]);