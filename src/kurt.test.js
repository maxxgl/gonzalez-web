import kurt from './kurt'

it('Outputs expected values', () => {
  const values = { x: 2, y: 3, z: 1}
  const result = kurt(values, 0, [])

  if (result.x !== 2 || result.y !== 3 || result.z !== 1 || result.orthog !== Math.pow(14, .5)) {
    console.log(result)
    throw new Error("Values do not match")
  }
});
