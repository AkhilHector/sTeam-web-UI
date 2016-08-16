angular.module('steam')

  .controller('optionsCtrl', ['$state', '$scope', '$uibModal', '$location', 'localStorageService', 'handler',
    function ($state, $scope, $uibModal, $location, localStorageService, handler) {
    $scope.createdoc = function (docDetails) {
      $scope.docDetails = docDetails;
      $uibModal.open({
        templateUrl: 'views/createdoc.html',
        controller: 'createDocCtrl',
        resolve: {
          docDetails: function () {
            return $scope.docDetails;
          }
        }
      })
    }
    $scope.createroom = function () {
      $uibModal.open({
        templateUrl: 'views/createroom.html',
        controller: 'createRoomCtrl'
      })
    }
    $scope.createcontainer = function () {
      $uibModal.open({
        templateUrl: 'views/createcontainer.html',
        controller: 'createContainerCtrl'
      })
    }
    $scope.delete = function () {
      if (localStorageService.get('currentObjPath') != null) {
        handler.delete('/' + localStorageService.get('currentObjPath')).then(function () {
          swal('Object deleted successfully')
          location.href = '/'
          localStorageService.remove('currentObjPath')
        })
        .catch(function () {
          swal('Unable to delete your current selection')
        })
      }
    }
  }])

  .controller('commentsCtrl', ['$scope', function ($scope) {
    $scope.comment = [];
    $scope.addComment = function () {
      if($scope.commentContent != "") {
        $scope.comment.push($scope.commentContent);
        $scope.commentContent = "";
      }
    }
    $scope.removeComment = function ($index) {
      $scope.comment.splice($index, 1);
    }
  }])

  .controller('createDocCtrl', ['$scope', '$state', '$location', '$uibModalInstance', 'fileUpload', 'handler',
    function ($scope, $state, $location, $uibModalInstance, fileUpload, handler) {
      var uploadUrl = '/home/' + $scope.user + '/test'
      var fileObj = {
        class: "Document",
        content: $scope.myfile,
        name: "test"
      }
      $scope.submit = function () {
        handler.put(uploadUrl, fileObj).then(function () {
          $uibModalInstance.dismiss('cancel')
          swal("created a document")
          location.href = '/'
          localStorageService.remove('currentObjPath')
        })
        .catch(function () {
          $uibModalInstance.dismiss('cancel')
          swal('Unable to create a document')
          location.href = '/'
          localStorageService.remove('currentObjPath')
        })
      }
      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      }
  }])

  .controller('uploadCtrl', ['$rootScope', '$scope', '$location', 'localStorageService', 'handler',
    function ($rootScope, $scope, $location, localStorageService, handler) {
      $scope.docDetails = {}
      var uploadUrl = '/home/' + $scope.user + '/' + $scope.docDetails.docName
      var fileObj = {
        class: "Document",
        content: "this file contains some content",
        name: $scope.docDetails.docName
      }
      $scope.submit = function () {
        handler.put(uploadUrl, fileObj).then(function () {
          $rootScope.loading = false;
          swal('File uploaded successfully')
          location.href = '/'
          localStorageService.remove('currentObjPath')
        })
        .catch(function () {
          swal('Unable to upload your file')
        })
        $rootScope.loading = true;
      }
      $scope.cancel = function () {
        if (localStorageService.get('currentObjPath') != null) {
          location.href = '/'
          localStorageService.remove('currentObjPath')
        }
      }
  }])

  .controller('createRoomCtrl', ['$scope', '$state', '$uibModalInstance', 'handler',
    function ($scope, $state, $uibModalInstance, handler) {
      var uploadUrl = '/home/' + $scope.user + '/test'
      var roomObj = {
        class: "Room",
        name: "test",
        description: "this is a test description"
      }
      $scope.submit = function () {
        handler.put(uploadUrl, roomObj).then(function () {
          $uibModalInstance.dismiss('cancel')
          swal("created a room")
          location.href = '/'
          localStorageService.remove('currentObjPath')
        })
        .catch(function () {
          $uibModalInstance.dismiss('cancel')
          swal('Unable to create a room')
          location.href = '/'
          localStorageService.remove('currentObjPath')
        })
      }
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    }
  }])

  .controller('createContainerCtrl', ['$scope', '$state', '$uibModalInstance', 'handler',
    function ($scope, $state, $uibModalInstance, handler) {
      var uploadUrl = '/home/' + $scope.user + '/test123'
      var roomObj = {
        class: "Container",
        name: "test123",
        description: "this is a container"
      }
      $scope.submit = function () {
        handler.put(uploadUrl, roomObj).then(function () {
          $uibModalInstance.dismiss('cancel')
          swal("created a container")
          location.href = '/'
          localStorageService.remove('currentObjPath')
        })
        .catch(function () {
          $uibModalInstance.dismiss('cancel')
          swal('Unable to create a container')
          location.href = '/'
          localStorageService.remove('currentObjPath')
        })
      }
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    }
  }])
