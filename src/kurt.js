export default function(accel, timestamp, data) {
//accel.x... are defined

  let orthog = Math.pow((Math.pow(accel.x, 2) + Math.pow(accel.y, 2) + Math.pow(accel.z, 2)) , 0.5)

  return { x: accel.x, y: accel.y, z: accel.z, orthog: orthog }

}
