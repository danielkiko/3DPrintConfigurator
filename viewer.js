var viewer;
var options = {
    env: 'AutodeskProduction2',
    api: 'streamingV2',  // for models uploaded to EMEA change this option to 'streamingV2_EU'
    getAccessToken: function(onTokenReady) {
        var token = 'KGSarRPJiGlO4X3i';
        var timeInSeconds = 3600; // Use value provided by Forge Authentication (OAuth) API
        onTokenReady(token, timeInSeconds);
    }
};

Autodesk.Viewing.Initializer(options, function() {

    var htmlDiv = document.getElementById('forgeViewer');
    viewer = new Autodesk.Viewing.GuiViewer3D(htmlDiv);
    var startedCode = viewer.start();
    if (startedCode > 0) {
        console.error('Failed to create a Viewer: WebGL not supported.');
        return;
    }

    console.log('Initialization complete, loading a model next...');

});
var htmlDiv = document.getElementById('forgeViewer');
viewer = new Autodesk.Viewing.GuiViewer3D(htmlDiv, {});