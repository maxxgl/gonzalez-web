export default function(motion, timestamp, data) {
  let result1 = motion.x
  let result2 = motion.y
  let result3 = motion.z

  // TODO: Stuff

  return [
    {
      id: 'Orthogonal Motion',
      data: [
        {
          x: '12',
          y: result1,
        }
      ],
      color: 'red',
    }
  ]
}
