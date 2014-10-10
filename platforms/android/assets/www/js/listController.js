starter.controller('listController',function($scope,$state,storageFunc,$ionicModal,$ionicScrollDelegate,$rootScope){
    if(!$rootScope.isLogged){
        $state.go('main')
    }
    else{
        $ionicModal.fromTemplateUrl('AddTodo.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.add = modal;
        });
        $ionicModal.fromTemplateUrl('modal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.test = function test(data){
            $scope.getResults =data;
            $ionicScrollDelegate.scrollBottom();
            $scope.$digest();
        }
        $scope.getRecords = function(){
            storageFunc.getRecords($scope.test)

        };
            $scope.getRecords();
        $scope.addTodoList = function(data){
            storageFunc.AddTodo(data);
            $scope.getRecords();
            $scope.add.hide();
            //
        }
        $scope.showForm = function(){
            $scope.add.show();
        }

        $scope.delete = function(id) {
            storageFunc.delete(id);
            storageFunc.getRecords($scope.test);
            $scope.$digest();
        }
        $scope.show = false;
        $scope.newItem={};
        $scope.dataCopy = function(data){
            $scope.modal.show();
            $scope.newItem = angular.copy(data);
            /*
             $scope.show = true;
             */
        };
        $scope.updateTodo = function(){
            storageFunc.updateTodo($scope.newItem);
            storageFunc.getRecords($scope.test);
            $scope.modal.hide();
//      $scope.show = false;
        }

        $scope.createContact = function(u) {
            $scope.modal.hide();
        };
    }



});