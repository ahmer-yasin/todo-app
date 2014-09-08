starter.controller('main',function($scope,storageFunc,$state,$localstorage,$rootScope){
    if($rootScope.isLogged){
            navigator.app.exitApp();
    }
       else{
        $scope.login =  function(u,p){
            if(u == 'ahmer' && p == 'abc123'){

                storageFunc.login();
            }
            else{
                $state.go($state.current, {}, {reload: true});        }
        }
        /*$scope.calc = function(e){
         console.log(e.target.value);
         console.log(eval(e.target.value));
         console.log(e);
         }*/
    }
});
