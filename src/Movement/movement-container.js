import React from 'react'
import { Context } from '../global-context';
import kurt from '../kurt'

export default class Movement extends React.Component {
  static contextType = Context

  render() {
    const { x, y, z } = this.context.acceleration
    const out = kurt(x, y, z)

    return (
      <div>
        {Object.keys(out).map(k => <div key={k}>{k}: {out[k]}</div>)}
      </div>
    )
  }
}
