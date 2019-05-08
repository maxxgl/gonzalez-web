/* eslint-disable */
/*
* @param accel: Object with new acceleration data, shape: { x: int, y: int, z: int }
* @param timestap: timestamp of data point event trigger
* @param log: Historical output objects, shape: { key: { x: time, y: value } }
* @param counter: int
*/
export default function(accel, rotation, timestamp, log, count) {
//accelx... are defined
//log.x,y,z,
//timestamp available

  let newCount = count + 0.1
  if (newCount > 2.0) {
    newCount = 0
  }

  let accelx = accel.x
  let accely = accel.y
  let accelz = accel.z
  let alpha = rotation.alpha
  let beta = rotation.beta
  let gamma = rotation.gamma

  // Destructure of historical data
  const xhistory = (log.x || { data: [] }).data // Array of past 'x' values ({ x: time, y: value })
  const yhistory = (log.y || { data: [] }).data // Array of past 'y' values ({ x: time, y: value })
  const zhistory = (log.z || { data: [] }).data // Arraz of past 'y' values ({ x: time, y: value })
  
  const filterXHistory = (log.lowPassX || { data: [] }).data
  const filterYHistory = (log.lowPassY || { data: [] }).data
  const filterZHistory = (log.lowPassZ || { data: [] }).data
  
  const orthoghistory = (log.orthog || { data: [] }).data
  
  const alpha_history = (log.alpha || { data: [] }).data
  const filter_alpha_history = (log.low_Pass_alpha || { data: [] }).data
  const beta_history = (log.beta || { data: [] }).data
  const filter_beta_history = (log.low_Pass_beta || { data: [] }).data
  const gamma_history = (log.gamma || { data: [] }).data
  const filter_gamma_history = (log.low_Pass_gamma || { data: [] }).data

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
  
  const last_filter_alpha = filter_alpha_history[filter_alpha_history.length - 1] || { x: 0, y: 0 }
  const low_Pass_alpha = (alpha - last_filter_alpha.y) * 0.1 + last_filter_alpha.y
  const last_filter_beta = filter_beta_history[filter_beta_history.length - 1] || { x: 0, y: 0 }
  const low_Pass_beta = (beta - last_filter_beta.y) * 0.1 + last_filter_beta.y
  const last_filter_gamma = filter_gamma_history[filter_gamma_history.length - 1] || { x: 0, y: 0 }
  const low_Pass_gamma = (gamma - last_filter_gamma.y) * 0.1 + last_filter_gamma.y
  
  // plotting gains and offsets
  let orthog_plot = (orthog - 9.81) * 10
  let alpha_plot = low_Pass_alpha/10
  let beta_plot = low_Pass_beta/10
  let gamma_plot = low_Pass_gamma/10

  return [
    {
      accelx,
      accely,
      accelz,
      orthog_plot,
      newCount,
      lowPassX,
      lowPassY,
      lowPassZ,
      alpha,
      alpha_plot,
      beta,
      beta_plot,
      gamma,
      gamma_plot,
    },
    newCount,
  ]

}
