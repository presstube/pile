// Looom To Animate Conversion

//Created by Alexander Jones, 2020.

//1. Drag your SVG file into an open project in Animate. (Needs to be done manually)
//2. Click OK, any of the settings will work the same. (Needs to be done manually)
//3. You will fist need to break the main SVG so select it and press ︎+B (stepThree)
//4. Now you have seperated your threads onto the stage (Notice there is an empty first layer which you can delete). Inorder to distribute them to layers press shift+︎+D (stepFour)
//5. Now you have all your threads sperated to layers! Next we will do the following to each layer: click the keyFrame of the layer in the timeLine then press ︎+B to break all the frames then press shift+︎+K to distribute all the keyframes to frames. (stepFive)
//6. Since the SVG’s in Looom want to show only one frame at a time you will have many transperant frames in the timeline. In order to make them visible we will want to select ALL our frames and break them out of their groups and symboles. Use Animate’s Edit Multiple Frames to select all the timeline’s frames and press ︎+B until you see the content of all frames. (stepSix)



function stepThree() {
  an.getDocumentDOM().breakApart();
}

function stepFour() {
  an.getDocumentDOM().distributeToLayers();
  an.getDocumentDOM().getTimeline().setSelectedLayers(0);
}

function stepFive() {
  for (var layers = 0; layers < an.getDocumentDOM().getTimeline().layerCount; layers++) {
    an.getDocumentDOM().getTimeline().currentLayer = layers;
    an.getDocumentDOM().getTimeline().setSelectedFrames(0, 1);
    an.getDocumentDOM().breakApart();
    an.getDocumentDOM().distributeToKeyframes();
  }
}

function stepSix() {
  for (var frame = 0; frame < an.getDocumentDOM().getTimeline().frameCount; frame++) {
    an.getDocumentDOM().getTimeline().setSelectedFrames(frame, frame+1);
    an.getDocumentDOM().selectAll();

    for (var i = 0;; i++) {
      an.getDocumentDOM().selectAll();
      try {
        an.getDocumentDOM().breakApart();
      } catch (e) {
        break;
      }
    }
    an.getDocumentDOM().selectNone();
  }
}

function cleanUp() {
  for (var layers = 0; layers < an.getDocumentDOM().getTimeline().layerCount; layers++) {
    an.getDocumentDOM().getTimeline().currentLayer = layers;
    //an.getDocumentDOM().getTimeline().removeFrames(0);
  }
  an.getDocumentDOM().selectNone();
}

stepThree();
stepFour();
stepFive();
stepSix();
cleanUp();
