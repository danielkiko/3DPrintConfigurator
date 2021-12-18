var viewer;
var documentId;
var coolerid;
var hotend = true;
var coolerSelect = document.getElementById("coolerSelect");

launchViewer();



// function change123() {
//   hotend = true;
//   console.log(hotend);
//   alert("1");

// }



function launchViewer() {
  var options = {
    env: 'AutodeskProduction',
    getAccessToken: getForgeToken
  };
  var options2 = {
    env: 'AutodeskProduction',
    getAccessToken: getForgeToken
  };





  Autodesk.Viewing.Initializer(options, () => {
    var someStr = location.search.split("hotend=");

    if (someStr.length == 2 && someStr[1] == "false") {
      hotend = false;
    }

    if (hotend) {
      coolerid = "urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y29vbGVycy9FM0RWNmZhbmR1Y3QuU1RM/output/1/E3DV6fanduct.svf";
      documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6aG90ZW5kL0UzRF9WNl9Ib3RlbmRfMV83NW1tX3VuaXZlcnNhbC4xMTVjNTgzNS1iMDUzLTRlY2MtOGVhZC1mNmEzYTQxYmRmYmUuZjNkJTIwdjUuZjNk';

    }
    else {
      coolerid = "urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y29vbGVycy9FM0RfQkxWX21vZGlmaWVkX2Zvcl9Wb2xjYW5vX3YxNS5mM2Q/output/0/1/Design.svf"
      documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6aG90ZW5kL19FM0RfVjZfVk9MQ0FOT19Ib3RlbmRfMV83NW1tLmJmYTdlZTgzLTcxMjktNDgwNy05NDdiLTBlNDJkYzQxNzRiYy5mM2QlMjB2Ni5mM2Q';//'вулкан';
    }
    // console.log(secondnozle);//'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6M2RwcmludGJ1Y2svRW5kZXIlMjAzJTIwJTIwZW4lMjAzZC5mM2QlMjB2MS5mM2Q';
    viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['Autodesk.DocumentBrowser'] });
    viewer.start();

    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
    viewer2 = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer2'), { extensions: ['Autodesk.DocumentBrowser'] });
    viewer2.start();
    viewer2.loadModel(coolerid);
  });
}

function onDocumentLoadSuccess(doc) {
  var viewables = doc.getRoot().getDefaultGeometry();
  viewer.loadDocumentNode(doc, viewables).then(i => {
    // documented loaded, any action?
    viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, function () { viewer.impl.visibilityManager.setNodeOff(13, true); });

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
          if (dbId == 13) {
            document.getElementById("chosen").innerHTML = "<p>Сопло  Makerbot MK8 является составной частью экструдера, через которую проходит расплавленный пластик. При прохождении через сопло диаметр нити уменьшается, за счёт чего достигается лучшее качество печати, т.к. от диаметра сопла зависит толщина напечатанного слоя. Существуют сопла различных размеров, которые можно легко менять в зависимости от требуемой точности и скорости печати.</p><p>Сопло Makerbot MK8 из латуни, рассчитано на пластик 1.75 мм</p><p>Выходное отверстие от 0.2 мм до 1.0 мм.</p><p>Подходит для экструдеров MK8 и E3D</p><h1>Характеристики: </h1><ul><li>Материал: латунь</li><li>Диаметр сопла: 0,2 – 0,5 мм</li><li>Резьба: M6</li><li>Под нить пластика: 1,75 мм</li></ul>"

          }
          if (dbId == 9) {
            document.getElementById("chosen").innerHTML = "<p>Сопло экструдера E3D-V6 является составной частью экструдера, через которую проходит расплавленный пластик. При прохождении через сопло диаметр нити уменьшается, за счёт чего достигается лучшее качество печати, т.к. от диаметра сопла зависит толщина напечатанного слоя. Существуют сопла различных размеров, которые можно легко менять в зависимости от требуемой точности и скорости печати. </p><p>Сопло для экструдера типа E3D-V6, подходит для нити пластика 1.75 мм. Вы можете выбрать нужный вам диаметр выхода сопла </p><h1>Характеристики: </h1><ul><li>Материал: латунь;</li><li>Диаметр сопла: 0.2 – 0.6 мм;</li><li>Длина: 12,5 мм;</li><li>Ширина: 7 мм;</li><li>Резьба: М6;</li><li>Под нить пластика 1,75 мм.</li></ul>"
          }
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
function selectCoolerf(opt) {
  switch (opt.value) {
    case "1":
      coolerid = "urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y29vbGVycy9FM0RWNmZhbmR1Y3QuU1RM/output/1/E3DV6fanduct.svf";
      viewer2.tearDown();
      viewer2.start();
      viewer2.loadModel(coolerid)
      break;
    case "2":
      coolerid = "urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y29vbGVycy9FM0RfQkxWX21vZGlmaWVkX2Zvcl9Wb2xjYW5vX3YxNS5mM2Q/output/0/1/Design.svf";
      viewer2.tearDown();
      viewer2.start();
      viewer2.loadModel(coolerid);
      break;
      case "3":
      coolerid = "urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y29vbGVycy9CTUclMjBQYXJ0cyUyMENvb2xpbmclMjB2MTAuZjNk/output/0/1/Design.svf"
      viewer2.tearDown();
      viewer2.start();
      viewer2.loadModel(coolerid);
      break;
    default:
      alert("default");
      break;
  }
}


