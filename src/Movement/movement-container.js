import React from 'react'
import { Context } from '../global-context';

export default class Movement extends React.Component {
  static contextType = Context

  render() {
    return (
      <div>
        <div>x: {this.context.acceleration.x}</div>
        <div>y: {this.context.acceleration.y}</div>
        <div>z: {this.context.acceleration.z}</div>
      </div>
    )
  }
}