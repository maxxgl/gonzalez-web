import React from 'react'
import { Context } from '../global-context';
import { ResponsiveLine } from '@nivo/line'

export default class Movement extends React.Component {
  static contextType = Context

  render() {
    const { kurt } = this.context
    const arr = Object.values(kurt)
    return (
      <div>
        {arr.map(d => <div key={d.id}>{d.id}: {d.data[0].y}</div>)}
        <div style={{ height: '70vh' }}>
          <Chart data={arr} />
        </div>
      </div>
    )
  }
}

const Chart = ({ data }) => (
  <ResponsiveLine
    data={data}
    margin={{
      "top": 50,
      "right": 110,
      "bottom": 50,
      "left": 60
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
    axisBottom={{
      "orient": "bottom",
      "tickSize": 5,
      "tickPadding": 5,
      "tickRotation": 0,
      "legend": "time",
      "legendOffset": 36,
      "legendPosition": "middle"
    }}
    axisLeft={{
      "orient": "left",
      "tickSize": 5,
      "tickPadding": 5,
      "tickRotation": 0,
      "legend": "count",
      "legendOffset": -40,
      "legendPosition": "middle"
    }}
    colors={{ "scheme": "nivo" }}
    dotSize={1}
    dotColor={{ "theme": "background" }}
    dotBorderWidth={2}
    dotBorderColor={{ "from": "color" }}
    animate={true}
    motionStiffness={90}
    motionDamping={15}
    theme={{ textColor: '#eee' }}
  />
)
