"use strict"

let lib
let AALib = document.createElement("script")
let scaler = 1
let rate = 1
let yPos = 0
let xRange = 200
let yRange = 200
let items = []

AALib.setAttribute("src", "AA/pile-lib.js")
document.body.appendChild(AALib)
AALib.addEventListener("load", () => {
  // needs to have explicit knowledge of this ID?
  let comp=AdobeAn.getComposition("9DDB8738695F40A58CB0CE0618646207")
  lib=comp.getLibrary()
  kickoff()
}, false)

function kickoff() {
  console.log('kickoff: ', lib)
  console.log('underscore: ', _.capitalize('FRED'))
  container.scaleX = scaler
  container.scaleY = scaler

  items = _.times(5, makeMulge)

  cjs.Ticker.framerate = 30
  createjs.Ticker.addEventListener("tick", tick)
}

function tick(e) {  
  // console.log('tick')
  stage.update()
}

function makeMulge(index) {
  let item = new lib.Mulge()
  let forward = true


  item.addEventListener('tick', e => {
    if (forward) {
      item.gotoAndStop(item.currentFrame+rate)
    } else {
      item.gotoAndStop(item.currentFrame-rate)
    }
    if (item.currentFrame >= item.totalFrames - rate && forward) {
      forward = false
      // items.splice(index, rate)
      // item.removeEventListener('tick')
      // container.removeChild(item)
    } else if (item.currentFrame <= 0 && !forward) {
      forward = true
    }
  })
  item.x = fxrand() * xRange - fxrand() * xRange
  item.y = fxrand() * yRange - fxrand() * yRange
  item.scaleX = fxrand() < 0.4 ? 1 : -1
  yPos += 20
  item.rotation = Math.random()*360

  recolorFill(item, "#00ff00")

//   if (index === 0) {
//     console.log('first', item)
//     item.alpha = 0.5
//     // item.shape_5.graphics._fill.style = "#00ff00"

// //item.totalFrames-1

//     console.log("loggy", item)

//     // _.delay(function(text) {
//       _.times(item.totalFrames, frameIndex => {
//         // let shapeName = frameIndex === 0 ? "shape" : "shape_" + frameIndex
//         // if (frameIndex > 0) {
//         //   console.log("shapeName: ", shapeName)
//         //   item[shapeName].graphics._fill.style = "#00ff00"
//         // }
//         item.gotoAndStop(frameIndex) 
//         console.log(item.children[0])
//         item.children[0].graphics._fill.style = "#00ff00"
//         // item[shapeName].graphics._fill.style = "#00ff00"
//         // console.log("loggy", item[shapeName].graphics._fill.style)
//         // console.log("frame: ", frameIndex, "shape_"+frameIndex)
//         // console.log("frame: ", item["shape_"+frameIndex])
//       })

//     // }, 3000, 'later');

//   }
  item.gotoAndStop(Math.floor(fxrand()*item.totalFrames))
  container.addChildAt(item, 0)

  return item
}


function recolorFill(item, color) {
  _.times(item.totalFrames, frameIndex => {
    item.gotoAndStop(frameIndex) 
    console.log(item.children[0])
    item.children[0].graphics._fill.style = color
  })
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



