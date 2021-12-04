"use strict"

///////////////////////////
// UTILS

function fxSample(arr) {
  return arr[Math.floor(fxrand()*arr.length)]
}

///////////////////////////

let lib
let AALib = document.createElement("script")
let scaler = 1
let rate = 1
let yPos = 0
let xMoveRange = 100
let yMoveRange = 100
let items = []
let arrPosX = 0
let arrPosY = 0
let maxItems = 5
let minItems = 5
let numItems = Math.floor(fxrand()*maxItems)+minItems
let xMoveRangeIncrement = xMoveRange / numItems
let rotationRateMax = 0.5

let primaryAssetData = [
  {name: "Pulsor0", playhead: "pingpong", fill: true, stroke:true},
]

let secondaryAssetData = [
  {name: "Looper0", playhead: "loop", fill: true, stroke:true},
  {name: "Pulsor1", playhead: "pingpong", fill: true, stroke:true},
  {name: "Constellation0", playhead: "loop", fill: false, stroke:true, pureStrokes:false},
  {name: "Looper2", playhead: "loop", fill: true, stroke:false},
  {name: "Looper3", playhead: "loop", fill: true, stroke:false},
  {name: "Hairy0", playhead: "loop", fill: false, stroke:true, pureStrokes:true},
]

let assetID = Math.floor(fxrand()*primaryAssetData.length)



let colorschemes = [

  ["590d22","800f2f","a4133c","c9184a","ff4d6d","ff758f","d2fd35","ffccd5","fff0f3"],
  ["d8f3dc","b7e4c7","ff0a50","74c69d","52b788","40916c","2d6a4f","1b4332","081c15"],
  ["007f5f","2b9348","55a630","80b918","aacc00","bfd200","eb4833","eeef20","ffff3f"],
  ["0d1f2d","546a7b","9ea3b0","fae1df","e4c3ad","6d2e46","ffe74c","ff5964","f9db6d"],
  ["bbe1c3","a7cdbd","869d7a","91785d","8b5d33","433e0e","e0b0d5","ffa552","ba5624"],
  ["9a8f97","c3baba","e9e3e6","b2b2b2","736f72","a30b37","40bcd8","355070","49beaa"],
  ["985f99","9684a1","aaacb0","b6c9bb","bfedc1","2d0320","0d160b","5c1a1b","5c573e"],
  ["ffd9da","ea638c","89023e","30343f","1b2021","93b7be","798071","623cea","16302b"],
  ["247ba0","70c1b3","b2dbbf","f3ffbd","ff1654","30362f","625834","da7422","8b2635"],
  ["0e0004","31081f","6b0f1a","b91372","fa198b","b7ad99","ff4365","00d9c0","fffff3"],
  ["7cfef0","6bffb8","2ceaa3","28965a","2a6041","090909","4b5043","a40e4c","2c2c54"],
  ["104f55","32746d","9ec5ab","01200f","011502","885053","fe5f55","23022e","ffa69e"],
  ["78c0e0","449dd1","192bc2","150578","0e0e52","6eeb83","e4ff1a","ffb800","ff5714"],
  ["2d2a32","ddd92a","eae151","eeefa8","fafdf6","cc2936","6b818c","eee5e9","c7e8f3"],
  ["4d5057","4e6e5d","4da167","3bc14a","cfcfcf","ed1c24","fdfffc","f1d302","f2e2d2"]


]

let colorScheme = fxSample(colorschemes)

let color = "#" + fxSample(colorScheme)
let nestedColor = "#" + fxSample(colorScheme)


AALib.setAttribute("src", "AA/pile-lib.js")
document.body.appendChild(AALib)
AALib.addEventListener("load", () => {
  let comp=AdobeAn.getComposition("9DDB8738695F40A58CB0CE0618646207")
  lib=comp.getLibrary()
  kickoff()
}, false)

function kickoff() {

  let graphics = new createjs.Graphics().beginFill("#"+fxSample(colorScheme)).drawRect(0, 0, 10000, 10000);
  let shape = new createjs.Shape(graphics);
  shape.x = -5000
  shape.y = -5000
  container.addChild(shape)
  // let frameGraphics = new cjs.Graphics().beginStroke("white").drawRect(-350, -350, 700, 700)
  // let frameShape = new cjs.Shape(frameGraphics)
  // container.addChild(frameShape)

  items = _.times(numItems, makePulsor)

  cjs.Ticker.framerate = 30
  createjs.Ticker.addEventListener("tick", tick)


  // // BITMAP OVERLAY FAILED ATTEMPT
  // var bitmap = new createjs.Bitmap("images/scanlines1.png")
  // var g = new createjs.Graphics()
  // g.beginBitmapFill(bitmap.image)
  // g.drawCircle(0,0,300)
  // var s = new createjs.Shape(g);
  // s.x = container.x;
  // s.y = container.y;
  // stage.addChild(s);

}

function tick(e) {  
  stage.update()
}

function recolor(item, itemData, color, depth) {
  depth = !depth ? 1 : depth
  let tempColor = color 
  let colorShiftRange = 5
  let colorShiftAmount = fxrand()/colorShiftRange - fxrand()/colorShiftRange
  tempColor = pSBC(colorShiftAmount, tempColor)
  let strokeColor = pSBC(-0.4, tempColor)
  if (itemData.fill) recolorFill(item, tempColor)
  if (itemData.stroke) {
    recolorStroke(item, strokeColor, itemData.pureStrokes)
    setStrokeWidth(item, 2*depth, itemData.pureStrokes)
  }
}

function makePulsor(index) {
  // if (fxrand()<0.4) {
  //   pulsorID = Math.floor(fxrand()*2)
  //   // color = "#"+fxSample(colorScheme)
  // }
  // let className = "Pulsor"+ pulsorID
  // let className = "Pulsor)"


  if (fxrand() < 0.4) {
    assetID = Math.floor(fxrand()*primaryAssetData.length)
    
  }


  let itemData = primaryAssetData[assetID]
  // let itemData = assetData[1]

  let item = new lib[itemData.name]()

  recolor(item, itemData, color)

  // let tempColor = color 
  // tempColor = pSBC(colorShiftAmount, tempColor)
  // let strokeColor = pSBC(-0.4, tempColor)
  // if (itemData.fill) recolorFill(item, tempColor)
  // if (itemData.stroke) {
  //   recolorStroke(item, strokeColor)
  //   setStrokeWidth(item, 2)
  // }

  item.gotoAndStop(Math.floor(fxrand()*item.totalFrames))

  let forward = true

  let rotationRate = fxrand()*rotationRateMax - fxrand()*rotationRateMax

  if (itemData.playhead == "pingpong") {
    item.addEventListener('tick', e => {
      if (forward) {
        item.gotoAndStop(item.currentFrame+rate)
      } else {
        item.gotoAndStop(item.currentFrame-rate)
      }
      if (item.currentFrame >= item.totalFrames - rate && forward) {
        forward = false
      } else if (item.currentFrame <= 0 && !forward) {
        forward = true
      }
      // item.rotation += rotationRate
    })
  } else {
    item.play()
  }



  item.x = fxrand() * xMoveRange - fxrand() * xMoveRange
  item.y = fxrand() * yMoveRange - fxrand() * yMoveRange
  // arrPosX += fxrand() * xMoveRange - fxrand() * xMoveRange
  // xMoveRange -= xMoveRangeIncrement
  // arrPosY -= 20
  item.scaleX = fxrand() < 0.4 ? 1 : -1
  // yPos += 20
  item.rotation = fxrand()*360

  // let color = "#00ff00"
  // let color = "#00ff00"
  container.addChildAt(item, 1)



  let nestedItemData = fxSample(secondaryAssetData)
  // let nestedItemData = secondaryAssetData[2]
  let nestedItem = new lib[nestedItemData.name]()
  nestedItem.scaleX = nestedItem.scaleY = 0.5
  let nestedItemForward = true
  recolor(nestedItem, nestedItemData, nestedColor, 2)
  nestedItem.gotoAndStop(Math.floor(fxrand()*item.totalFrames))
  if (itemData.playhead == "pingpong") {
    nestedItem.addEventListener('tick', e => {
      if (nestedItemForward) {
        nestedItem.gotoAndStop(nestedItem.currentFrame+rate)
      } else {
        nestedItem.gotoAndStop(nestedItem.currentFrame-rate)
      }
      if (nestedItem.currentFrame >= nestedItem.totalFrames - rate && nestedItemForward) {
        nestedItemForward = false
      } else if (nestedItem.currentFrame <= 0 && !nestedItemForward) {
        nestedItemForward = true
      }
      // nestedItem.rotation += rotationRate
    })
  } else {
    nestedItem.play()
  }
  item.anchor1.addChild(nestedItem)



  return item
}




function recolorFill(item, color) {
  _.times(item.totalFrames, frameIndex => {
    item.gotoAndStop(frameIndex) 
    item.children[0].graphics._fill.style = color
  })
}

function recolorStroke(item, color, pure) {
  if (pure) {
    _.times(item.children.length, childIndex => {
      _.times(item.totalFrames, frameIndex => {
        item.gotoAndStop(frameIndex) 
        item.children[childIndex].graphics._stroke.style = color
      })
    })
  } else {
    _.times(item.totalFrames, frameIndex => {
      item.gotoAndStop(frameIndex) 
      item.children[1].graphics._stroke.style = color
    })
  }
  console.log("chasdoij", item.children)

}

function setStrokeWidth(item, width, pure) {
  // _.times(item.totalFrames, frameIndex => {
  //   item.gotoAndStop(frameIndex) 
  //   item.children[1].graphics._strokeStyle.width = width
  // })

  if (pure) {
    _.times(item.children.length, childIndex => {
      _.times(item.totalFrames, frameIndex => {
        item.gotoAndStop(frameIndex) 
        item.children[childIndex].graphics._strokeStyle.width = width
      })
    })
  } else {
    _.times(item.totalFrames, frameIndex => {
      item.gotoAndStop(frameIndex) 
      item.children[1].graphics._strokeStyle.width = width
    })
  }
}



//   let forward = true

//   item.addEventListener('tick', e => {
//     if (forward) {
//       item.gotoAndStop(item.currentFrame+rate)
//     } else {
//       item.gotoAndStop(item.currentFrame-rate)
//     }
//     if (item.currentFrame >= item.totalFrames - rate && forward) {
//       forward = false
//       // items.splice(index, rate)
//       // item.removeEventListener('tick')
//       // container.removeChild(item)
//     } else if (item.currentFrame <= 0 && !forward) {
//       forward = true
//     }
//   })


// let lib, testy
// let AALib = document.createElement("script")
// let frameCount = 0
// let index = 0
// let delay = 3
// let scaler = 1
// let items = []
// let spreadX = 400*fxrand()+100
// let spreadY = 400*fxrand()+100
// let featureSpreadX = 200*fxrand()+50
// let featureSpreadY = 200*fxrand()+50
// let isSpawning = true
// let numberOfItems = Math.floor(fxrand()*40)+2
// let homogeneity = fxrand()
// let ids = populateIDS()
// let names = [
//   "Scrobeys", 
//   "Cheelies", 
//   "Skrunties", 
//   "Flabiens", 
//   "Mongbrines", 
//   "Pweefs", 
//   "Sleesies"]
// let mouth = null


// let mouthRotation = fxrand()*180


// let expandNames = ids.map(x => names[x])

// const occurrences = expandNames.reduce(function (acc, curr) {
//   return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
// }, {})


// let frameRange = Math.floor(fxrand()*47) // cohesion




// // console.log("synchrony: ", 100 - Math.floor(frameRange/47*100) + "%")

// occurrences.synchrony = 100 - Math.floor(frameRange/47*100) + "%"
// occurrences.homogeneity = Math.floor((100 - (homogeneity * 100))) + "%"
// occurrences.clamour = Math.floor((numberOfItems / 42) * 100) + "%"
// occurrences.happiness = Math.floor(mouthRotation / 180 * 100) + "%"


// window.$fxhashFeatures = occurrences

// console.log('window.$fxhashFeatures: ', window.$fxhashFeatures)

// AALib.setAttribute("src", "AA/swarm-1-lib.js")
// document.body.appendChild(AALib)
// AALib.addEventListener("load", () => {
//   // needs to have explicit knowledge of this ID?
//   let comp=AdobeAn.getComposition("BFBF82D5BFBB4EAE823822E8452D5FFD")
//   lib=comp.getLibrary()
//   kickoff()
// }, false)

// function kickoff() {

//   console.log('kicking off')

//   // window.addEventListener("mousedown", handleDown)
//   // window.addEventListener("mouseup", handleUp)
//   // window.addEventListener("touchstart", handleDown)
//   // window.addEventListener("touchend", handleUp)

//   container.scaleX = scaler
//   container.scaleY = scaler
//   cjs.Ticker.framerate = 30
//   createjs.Ticker.addEventListener("tick", tick)


//   let graphics = new createjs.Graphics().beginFill("#EEEEEE").drawRect(0, 0, 10000, 10000);
//   let shape = new createjs.Shape(graphics);
//   shape.x = -5000
//   shape.y = -5000

//   container.addChild(shape)


//   // console.log("fxhash: ", fxhash)
//   // console.log("fxrand(): ", fxrand())

//   for (let i = 0; i < ids.length; i++) {
//     spawnSwarmItem(ids[i])
//   }

//   addMouth(0)
//   addEye(0)



//   container.addChildAt(mouth, Math.floor(numberOfItems/2))

// }

// function populateIDS() {
//   let ids = []
//   let nextId = Math.floor(fxrand()*7)
//   for (let i = 0; i < numberOfItems; i++) {
//     ids.push(nextId)
//     if (fxrand() < homogeneity) {
//       nextId = Math.floor(fxrand()*7)
//     }
//   }
//   return ids
// }

// // function handleDown() {
// //   // console.log('down')
// //   isSpawning = true
// //   spawnSwarmItem()
// // }

// // function handleUp() {
// //   // console.log('up')
// //   isSpawning = false
// // }

// function tick(e) {  
//   frameCount++
//   // if (isSpawning) {
//   //   spawnSwarmItem()
//   // }
//   stage.update();
// }

// function spawnSwarmItem(id) {

//   // console.log('spawning:', id)

//   // let item = new lib.Pulsor0()


//   // let libID = Math.floor(fxrand()*7)
//   let item = new lib["Pulsor" + id]()

//   // console.log('libID: ', libID)
//   // console.log('asdasd: ', new lib["Pulsor" + libID]())

//   let rate = 1
//   // let rate = fxrand()*2

//   // let item = new lib.Blizzard()
//   let index = items.push(item)
//   item.x = fxrand()*spreadX - fxrand()*spreadX
//   item.y = fxrand()*spreadY - fxrand()*spreadY
//   item.rotation = fxrand()*360
//   item.scaleX = fxrand() < 0.5 ? 1 : -1
//   // item.scaleY = fxrand() < 0.5 ? 1 : -1
//   // item.stop()


//   item.gotoAndStop(Math.floor(fxrand()*frameRange))

//   let forward = true

//   item.addEventListener('tick', e => {
//     if (forward) {
//       item.gotoAndStop(item.currentFrame+rate)
//     } else {
//       item.gotoAndStop(item.currentFrame-rate)
//     }
//     if (item.currentFrame >= item.totalFrames - rate && forward) {
//       forward = false
//       // items.splice(index, rate)
//       // item.removeEventListener('tick')
//       // container.removeChild(item)
//     } else if (item.currentFrame <= 0 && !forward) {
//       forward = true
//     }
//   })

//   container.addChild(item)
// }

// function addMouth(id) {
//   let item = new lib["Mouth" + id]()
//   mouth = item
//   let index = items.push(item)
//   item.x = fxrand()*featureSpreadX - fxrand()*featureSpreadX
//   item.y = fxrand()*featureSpreadY - fxrand()*featureSpreadY
//   item.rotation = mouthRotation
//   item.scaleX = fxrand() < 0.5 ? 1 : -1

//   item.gotoAndStop(Math.floor(fxrand()*item.totalFrames))

//   let forward = true

//   item.addEventListener('tick', e => {
//     if (forward) {
//       item.gotoAndStop(item.currentFrame+1)
//     } else {
//       item.gotoAndStop(item.currentFrame-1)
//     }
//     if (item.currentFrame === item.totalFrames - 1 && forward) {
//       forward = false
//       // items.splice(index, 1)
//       // item.removeEventListener('tick')
//       // container.removeChild(item)
//     } else if (item.currentFrame === 0 && !forward) {
//       forward = true
//     }
//   })

//   container.addChild(item)

// }

// function addEye(id) {
//   let item = new lib["Eye" + id]()
//   let index = items.push(item)
//   item.x = fxrand()*featureSpreadX - fxrand()*featureSpreadX
//   item.y = fxrand()*featureSpreadY - fxrand()*featureSpreadY
//   item.rotation = fxrand()*360
//   item.scaleX = fxrand() < 0.5 ? 1 : -1

//   item.gotoAndStop(Math.floor(fxrand()*item.totalFrames))

//   let forward = true

//   item.addEventListener('tick', e => {
//     if (forward) {
//       item.gotoAndStop(item.currentFrame+1)
//     } else {
//       item.gotoAndStop(item.currentFrame-1)
//     }
//     if (item.currentFrame === item.totalFrames - 1 && forward) {
//       forward = false
//       // items.splice(index, 1)
//       // item.removeEventListener('tick')
//       // container.removeChild(item)
//     } else if (item.currentFrame === 0 && !forward) {
//       forward = true
//     }
//   })

//   container.addChild(item)

// }

// function checkItems() {
//   for (item of items) {
//     if (item.currentFrame == item.totalFrames - 1) {

//     }
//   }
// }




