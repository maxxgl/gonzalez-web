import React from 'react'
import './cockpit-style.css'
import { Context } from '../global-context';
import { ResponsivePie } from '@nivo/pie'

export default (props) => (
  <Context.Consumer>
    {({ kurt }) => <Display kurt={kurt} />}
  </Context.Consumer>
)

const Display = ({ kurt }) => {
  const {
    orthog_plot = { data: [{ y: 0 }] },
    speed = { data: [{ y: 0 }] },
    // alpha = { data: [{ y: 0 }] },
    // beta = { data: [{ y: 0 }] },
    // gamma = { data: [{ y: 0 }] },
  } = kurt

  const speedValue = (speed.data[speed.data.length - 1].y * 3.6).toFixed(1)
  const orthogValue = orthog_plot.data[orthog_plot.data.length - 1].y

  return (
    <div>
      <div className="pie-wrapper">
        <ResponsivePie
          data={[
            {
              id: "speed",
              label: "speed",
              value: speedValue,
            },
            {
              id: "neg-speed",
              label: "",
              value: (180 - speedValue),
            },
          ]}
          startAngle={-90}
          endAngle={90}
          fit={true}
          margin={{ "top": 25, "bottom": 0, "left": 30, "right": 20, }}
          innerRadius={.75}
          padAngle={0.7}
          cornerRadius={3}
          colors={{ "scheme": "paired" }}
          enableRadialLabels={false}
          enableSlicesLabels={false}
          isInteractive={false}
          animate={false}
          defs={[
            {
              id: 'neg',
              type: 'patternDots',
              background: "rgba(255, 255, 255, .25)",
              color: "transparent",
            }
          ]}
          fill={[
            {
              match: { id: 'neg-speed' },
              id: 'neg'
            },
          ]}
        />
        <div className="readouts">Speed: {speedValue} km/h</div>
      </div>
      <div className="pie-wrapper">
        <ResponsivePie
          data={[
            {
              id: "speed",
              label: "speed",
              value: orthogValue,
            },
            {
              id: "neg-speed",
              label: "",
              value: (30 - orthogValue),
            },
          ]}
          startAngle={-90}
          endAngle={90}
          fit={true}
          margin={{ "top": 25, "bottom": 10, "left": 30, "right": 20, }}
          innerRadius={.75}
          padAngle={0.7}
          cornerRadius={3}
          colors={{ "scheme": "nivo" }}
          enableRadialLabels={false}
          enableSlicesLabels={false}
          isInteractive={false}
          animate={false}
          defs={[
            {
              id: 'neg',
              type: 'patternDots',
              background: "transparent",
              color: "transparent",
            }
          ]}
          fill={[
            {
              match: { id: 'neg-speed' },
              id: 'neg'
            },
          ]}
        />
        <div className="readouts">
          Acceleration: {(orthogValue / 9.8).toFixed(1)}g
        </div>
      </div>
    </div>
  )
}
