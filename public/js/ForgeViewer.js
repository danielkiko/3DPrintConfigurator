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
    viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: [ 'Autodesk.DocumentBrowser'] });
    viewer.start();
    documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6aG90ZW5kL0UzRF9WNl9Ib3RlbmRfMV83NW1tX3VuaXZlcnNhbC4xMTVjNTgzNS1iMDUzLTRlY2MtOGVhZC1mNmEzYTQxYmRmYmUuZjNkJTIwdjUuZjNk'//'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6M2RwcmludGJ1Y2svRW5kZXIlMjAzJTIwJTIwZW4lMjAzZC5mM2QlMjB2MS5mM2Q';
    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
  });
}

function onDocumentLoadSuccess(doc) {
  var viewables = doc.getRoot().getDefaultGeometry();
  viewer.loadDocumentNode(doc, viewables).then(i => {
    // documented loaded, any action?
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

function Changeurn()
  {
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