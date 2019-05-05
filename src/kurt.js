export default function(accel, timestamp, data, count) {
//accelx... are defined
//data.x,y,z,
//timestamp available
//
  let newCount = count+1
  if (newCount > 10) {
    newCount = 0
  }
  
  let accelx = accel.x
  let accely = accel.y
  let accelz = accel.z

  // Destructure of historical data
  const xhistory = data.x.data // Array of past 'x' values ({ x: time, y: value })
  const yhistory = data.y.data // Array of past 'y' values ({ x: time, y: value })
  const zhistory = data.z.data // Arraz of past 'y' values ({ x: time, y: value })

  // array access
  const firstx = xhistory[xhistory.length - 1]
  firstxTime = firstx.x
  firstxValue = firstx.y


  let orthog = Math.pow((Math.pow(accely, 2) + Math.pow(accel.y, 2) + Math.pow(accelz, 2)) , 0.5)

  return [{ accelx, accely, accelz, orthog }, newCount]

}
