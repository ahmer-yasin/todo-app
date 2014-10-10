/**
 * Created by AHMER on 9/9/2014.
 */
starter.controller('sign_up',function($scope,$ionicLoading,$state){
   $scope.signUp = function(){
       $ionicLoading.show({template: 'Processing...'});
       var body = {
           email:$scope.email,
           first_name:$scope.fName,
           last_name:$scope.lName,
           display_name:$scope.displayName,
           new_password:$scope.password
        }
        window.df.apis.user.register({body:body},function(responce){
            console.log(responce);
            $ionicLoading.hide();
            $state.go('main');
        },function(err){
            console.log(err);
            $ionicLoading.hide();
        } );
     }


})