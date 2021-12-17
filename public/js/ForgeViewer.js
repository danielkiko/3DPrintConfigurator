var viewer;
var documentId;
var hotend = true;

launchViewer()
function launchViewer() {
  var options = {
    env: 'AutodeskProduction',
    getAccessToken: getForgeToken
  };



  Autodesk.Viewing.Initializer(options, () => {
    viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['Autodesk.DocumentBrowser'] });
    viewer.start();
    documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6aG90ZW5kL0UzRF9WNl9Ib3RlbmRfMV83NW1tX3VuaXZlcnNhbC4xMTVjNTgzNS1iMDUzLTRlY2MtOGVhZC1mNmEzYTQxYmRmYmUuZjNkJTIwdjUuZjNk'
    // console.log(secondnozle);//'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6M2RwcmludGJ1Y2svRW5kZXIlMjAzJTIwJTIwZW4lMjAzZC5mM2QlMjB2MS5mM2Q';
    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
    
  });
}

function onDocumentLoadSuccess(doc) {
  var viewables = doc.getRoot().getDefaultGeometry();
  viewer.loadDocumentNode(doc, viewables).then(i => {
    // documented loaded, any action?
    viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, function () {viewer.impl.visibilityManager.setNodeOff(13, true);});

    console.log(viewer.model.getDocumentNode());
    viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, function () {
      const tree = viewer.model.getInstanceTree();
      if (tree) { // Could be null if the tree hasn't been loaded yet
        const selectedIds = viewer.getSelection();
        for (const dbId of selectedIds) {
          const fragIds = [];
          tree.enumNodeFragments(
            dbId,
            function (fragId) { fragIds.push(fragId); },
            false
          );
          console.log('dbId:', dbId, 'fragIds:', fragIds);
          
        }
      }
    });
  });
}

function onDocumentLoadFailure(viewerErrorCode, viewerErrorMsg) {
  console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode + '\n- errorMessage:' + viewerErrorMsg);
}

function getForgeToken(callback) {
  fetch('/api/forge/oauth/token').then(res => {
    res.json().then(data => {
      callback(data.access_token, data.expires_in);
    });
  });
}

function Changeurn() {
  if (hotend) {
    documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6aG90ZW5kL0UzRF9WNl9Ib3RlbmRfMV83NW1tX3VuaXZlcnNhbC4xMTVjNTgzNS1iMDUzLTRlY2MtOGVhZC1mNmEzYTQxYmRmYmUuZjNkJTIwdjUuZjNk';
    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
    document.getElementById("change").innerHTML = "Поменять на хотэнд";
    hotend = false;
  }
  else {
    documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6aG90ZW5kL19FM0RfVjZfVk9MQ0FOT19Ib3RlbmRfMV83NW1tLmJmYTdlZTgzLTcxMjktNDgwNy05NDdiLTBlNDJkYzQxNzRiYy5mM2QlMjB2Ni5mM2Q';//'вулкан';
    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
    document.getElementById("change").innerHTML = "Поменять на принтер";
  }
}