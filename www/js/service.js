starter.factory('storageFunc',function($localstorage,$state,$ionicLoading,$rootScope){
    var todoList = '';
    var obj = {};
    var login = function (u,p) {
        $ionicLoading.show({template: 'Logging...'});
        var body = {
            email: u,
            password: p
        };
        window.df.apis.user.login({body: body}, function (response) {
            if(typeof(response)=="object"){
                console.log(typeof(response));
                $localstorage.set("isLogged",true);
                $rootScope.isLogged=true;
                $ionicLoading.hide();
                $state.go('todo');
            }
            window.authorizations.add("X-DreamFactory-Session-Token", new ApiKeyAuthorization("X-Dreamfactory-Session-Token", response.session_id, 'header'));
            console.log(response)
        }, function(response){
            $ionicLoading.hide();
            console.log(response);

        });
    };
    var getRecords = function (func) {
        $ionicLoading.show({template: 'Getting Records...'});
        window.df.apis.db.getRecords({table_name: "todo"}, function (response) {
            todoList = response.record;
            func(response.record);
            console.log(response)
            $ionicLoading.hide();
        }, function(response) {
            console.log(getErrorString(response));
        });
    };
    var getErrorString = function(response){
        var msg = "An error occurred, but the server provided no additional information.";
        if (response.content && response.content.data && response.content.data.error) {
            msg = response.content.data.error[0].message;
        }
        msg = msg.replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&').replace(/&apos;/g, '\'');
        return msg;
    };
    var addTodo = function (name) {
        var item = {"record":[{"name":name,"complete":false}]};
        window.df.apis.db.createRecords({"table_name":"todo", "body":item}, function(response) {
            console.log(response);

        }, function(response) {
            console.log(getErrorString(response));
        });
    };
    var deleteTodo = function (id) {
        window.df.apis.db.deleteRecords({"table_name":"todo", "ids":id}, function(response) {
            console.log(response);
        }, function(response) {
            console.log(response);
        });
    };
    var updateTodo = function (obj) {
        var complete = true;
        /* var item = {"record":[{"id":id,"complete":complete,name:$scope.name}]};*/
        df.apis.db.updateRecords({"table_name":"todo", "body":obj}, function(response) {
         console.log(response);
        }, function(response) {
            console.log(getErrorString(response));
        });
    };
    var getList = function(){
        return todoList;
    }
    return{
        'login':login,
        'AddTodo':addTodo,
        'getRecords':getRecords,
        'get':getList,
        'delete':deleteTodo,
        'updateTodo':updateTodo
    }
})