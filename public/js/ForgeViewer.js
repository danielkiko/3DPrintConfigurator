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
    documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6ZTNkdm9sY2Fuby9fRTNEX1Y2X1ZPTENBTk9fSG90ZW5kXzFfNzVtbS5iZmE3ZWU4My03MTI5LTQ4MDctOTQ3Yi0wZTQyZGM0MTc0YmMuZjNkJTIwdjEuZjNk'//'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6M2RwcmludGJ1Y2svRW5kZXIlMjAzJTIwJTIwZW4lMjAzZC5mM2QlMjB2MS5mM2Q';
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
    documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6M2RwcmludGJ1Y2svRW5kZXIlMjAzJTIwJTIwZW4lMjAzZC5mM2QlMjB2MS5mM2Q';
    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
    document.getElementById("change").innerHTML = "Поменять на хотэнд";
    hotend = false;
    }
    else {
      documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6ZTNkdm9sY2Fuby9fRTNEX1Y2X1ZPTENBTk9fSG90ZW5kXzFfNzVtbS5iZmE3ZWU4My03MTI5LTQ4MDctOTQ3Yi0wZTQyZGM0MTc0YmMuZjNkJTIwdjEuZjNk'//'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6M2RwcmludGJ1Y2svRW5kZXIlMjAzJTIwJTIwZW4lMjAzZC5mM2QlMjB2MS5mM2Q';
      Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
      document.getElementById("change").innerHTML = "Поменять на принтер";
    }
  }