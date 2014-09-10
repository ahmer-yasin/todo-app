starter.controller('main',function($scope,storageFunc,$state,$localstorage,$rootScope){
    if($rootScope.isLogged){
        navigator.app.exitApp();
    }
    else{
        $scope.login =  function(u,p){

                storageFunc.login(u,p);
        }
    }});
