import React from 'react'
import { Line } from 'react-chartjs-2'

import {
  ChartData,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ScatterDataPoint,
  BubbleDataPoint
} from 'chart.js'

interface Props {
  data: ChartData<'line', (number | ScatterDataPoint | BubbleDataPoint)[], unknown>
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export function ChartElement({ data }: Props): JSX.Element {
  return <Line data={data} />
}
