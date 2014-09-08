window.onload = function () {
    if (!document.createEvent) {
        var apiReady = new Event('apiReady');
    } else {
        var apiReady = document.createEvent("Event");
        apiReady.initEvent("apiReady", true, false);
    }
    //replace this dsp_url with yours ( leave the /rest/api_docs part )
    var dsp_url = "https://dsp-mydreamtesting.cloud.dreamfactory.com/rest/api_docs";
    //replace this app_name with yours
    var app_name = "new-app";

    //These are are necessary to communicate with the DreamFactory API
    window.authorizations.add("X-DreamFactory-Application-Name", new ApiKeyAuthorization("X-DreamFactory-Application-Name", app_name, "header"));
    window.authorizations.add('Content-Type', new ApiKeyAuthorization('Content-Type', 'application/json', 'header'));

    // Here I grab all the apis available, assigning them to a global df object
    window.df = new SwaggerApi({
        url: dsp_url,
        supportedSubmitMethods: ['get', 'post', 'put', 'patch', 'merge', 'delete'],
        success: function () {

            if (window.df && window.df.ready === true) {
                document.dispatchEvent(apiReady);
            }
        },
        error: function () {
            console.log("error occurred");
        }
    });

//attach auth headers
    window.df.authorizations = window.authorizations;
    window.df.build();
}
;