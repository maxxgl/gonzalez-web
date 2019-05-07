/* eslint-disable */
/*
* @param accel: Object with new acceleration data, shape: { x: int, y: int, z: int }
* @param timestap: timestamp of data point event trigger
* @param log: Historical output objects, shape: { key: { x: time, y: value } }
* @param counter: int
*/
export default function(accel, timestamp, log, count) {
//accelx... are defined
//log.x,y,z,
//timestamp available

  let newCount = count + 0.1
  if (newCount > 1) {
    newCount = 0
  }

  let accelx = accel.x
  let accely = accel.y
  let accelz = accel.z

  // Destructure of historical data
  const xhistory = (log.x || { data: [] }).data // Array of past 'x' values ({ x: time, y: value })
  const yhistory = (log.y || { data: [] }).data // Array of past 'y' values ({ x: time, y: value })
  const zhistory = (log.z || { data: [] }).data // Arraz of past 'y' values ({ x: time, y: value })
  const orthoghistory = (log.orthog || { data: [] }).data
  const filterXHistory = (log.lowPassX || { data: [] }).data
  const filterYHistory = (log.lowPassY || { data: [] }).data
  const filterZHistory = (log.lowPassZ || { data: [] }).data

  // array access
  const lastAccelx = xhistory[xhistory.length - 1] || { x: 0, y: 0 } // most recent data of 'x'
  let lastxTime = lastAccelx.x
  let lastxValue = lastAccelx.y
  
  const lastAccely = yhistory[yhistory.length - 1] || { x: 0, y: 0 } // most recent data of 'x'
  let lastyTime = lastAccely.x
  let lastyValue = lastAccely.y
  
  const lastAccelz = zhistory[zhistory.length - 1] || { x: 0, y: 0 } // most recent data of 'x'
  let lastzTime = lastAccelz.x
  let lastzValue = lastAccelz.y

  // low pass filter
  const lastFilterX = filterXHistory[filterXHistory.length - 1] || { x: 0, y: 0 }
  const lowPassX = (accelx - lastFilterX.y) * 0.1 + lastFilterX.y
  const lastFilterY = filterYHistory[filterYHistory.length - 1] || { x: 0, y: 0 }
  const lowPassY = (accely - lastFilterY.y) * 0.1 + lastFilterY.y
  const lastFilterZ = filterZHistory[filterZHistory.length - 1] || { x: 0, y: 0 }
  const lowPassZ = (accelz - lastFilterZ.y) * 0.1 + lastFilterZ.y

  let orthog = Math.pow((Math.pow(lowPassX, 2) + Math.pow(lowPassY, 2) + Math.pow(lowPassZ, 2)) , 0.5)
  
  return [
    { accelx, accely, accelz, orthog, newCount, lowPassX, lowPassY, lowPassZ },
    newCount,
  ]

}
