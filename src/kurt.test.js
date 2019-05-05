import kurt from './kurt'

it('Outputs expected values', () => {

  const values = { x: 2, y: 3, z: 1}
  const result = kurt(values, 0, {})[0]

  const calc = Math.pow(14, .5)

  if (result.orthog !== calc) {
    throw new Error(`Orthog mismatch. Actual: ${result.orthog}, Expected: ${calc}`)
  }

});
