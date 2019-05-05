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

  let newCount = count+1
  if (newCount > 10) {
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

  // array access
  const lastAccelx = xhistory[xhistory.length - 1] || { x: 0, y: 0 } // most recent data of 'x'
  let lastxTime = lastAccelx.x
  let lastxValue = lastAccelx.y
  
  const lastAccely = yhistory[yhistory.length - 1] || { x: 0, y: 0 } // most recent data of 'x'
  let lastyTime = lastAccely.x
  let lastyValue = lastAccely.y
  //let filt_accely = ((accely * 0.1) + lastyValue)
  
  const lastAccelz = zhistory[zhistory.length - 1] || { x: 0, y: 0 } // most recent data of 'x'
  let lastzTime = lastAccelz.x
  let lastzValue = lastAccelz.y
  



  let orthog = Math.pow((Math.pow(accelx, 2) + Math.pow(accely, 2) + Math.pow(accelz, 2)) , 0.5)

  return [{ accelx, accely, accelz, orthog }, newCount]

}
