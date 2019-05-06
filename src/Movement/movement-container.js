import React from 'react'
import './movement-style.css'
import { Context } from '../global-context';
import { ResponsiveLine } from '@nivo/line'

export default class Movement extends React.Component {
  static contextType = Context

  render() {
    const { kurt, pause, paused, print } = this.context
    const arr = Object.values(kurt)
    return (
      <div>
        {arr.map(d => <Data key={d.id} {...d} print={print} />)}
        <div style={{ height: '70vh' }}>
          <Chart data={arr.filter(v => v.show)} />
        </div>
        <button className="btn btn-float" onClick={pause}>
          {paused ? 'PLAY' : 'PAUSE'}
        </button>
      </div>
    )
  }
}

const Data = ({ id, data, show, print }) => (
  <div className={"movement-datafield" + (show ? " active" : "")}>
    <div>{id}: </div>
    <div>{data[data.length - 1].y}</div>
    <label className="switch">
      <input type="checkbox"
        checked={show}
        onClick={() => print(id)}
      />
      <span className="slider round"></span>
    </label>
  </div>
)

const Chart = ({ data }) => (
  <ResponsiveLine
    data={data}
    margin={{
      "top": 25,
      "bottom": 10,
      "left": 30,
      "right": 20,
    }}
    xScale={{
      "type": "point"
    }}
    yScale={{
      "type": "linear",
      "min": 15,
      "max": -15,
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={null}
    enableGridX={false}
    colors={{ "scheme": "paired" }}
    dotSize={1}
    dotColor={{ "theme": "background" }}
    dotBorderWidth={2}
    dotBorderColor={{ "from": "color" }}
    animate={false}
    theme={{ textColor: '#eee' }}
  />
)
