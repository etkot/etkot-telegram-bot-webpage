import { authGuard } from '../../utils/authGuard'
import { client } from '../../utils/networkConfigs'
import './index.css'

type Credit = {
  from: string
  date: number
}

type CreditDoc = {
  _id: string
  username: string
  minus_credits: Credit[]
  plus_credits: Credit[]
}

await authGuard()

const creditsQuery = `#graphql
  query {
    credits: getAllCredits {
      _id
      username
      plus_credits {
        from
        date
      } 
      minus_credits {
        from
        date
      }
    }
  }
`

const { credits } = await client<{ credits: CreditDoc[] }>(creditsQuery)
console.log(credits)

const element = document.getElementById('chart') as HTMLCanvasElement
const ctx = element.getContext('2d')

const combinedCredits = credits.map((item) => ({
  label: item.username,
  allCredits: (
    [...item.plus_credits, ...item.minus_credits.map((item) => ({ ...item, minus: true }))] as (Credit & {
      minus?: boolean
    })[]
  )
    .sort((a, b) => a.date - b.date)
    .reduce(
      (acc, curr) => {
        acc.sum += curr.minus ? -20 : 20
        acc.array.push({ x: curr.date * 1000, y: acc.sum, from: curr.from })
        return acc
      },
      { array: [], sum: 0 }
    ).array,
}))

const datasets: Chart.ChartDataSets[] = combinedCredits.map((item) => ({
  label: item.label,
  data: item.allCredits,
  lineTension: 0.5,
  borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
  borderWidth: 1,
  backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
  // backgroundColor: 'rgba(255,255,255, 0.5)',
}))

// @ts-ignore
const myChart = new Chart(ctx, {
  type: 'line',
  data: {
    datasets,
  },
  options: {
    scales: {
      x: {
        type: 'timeseries',
        time: {},
      } as Chart.CommonAxe,
    } as Chart.ChartScales,
    plugins: {
      tooltip: {
        callbacks: {
          beforeTitle: (tooltipItem: Chart.ChartTooltipItem[], data: Chart.ChartData) =>
            `From: ${(tooltipItem[0] as any)?.raw?.from}`,
        },
      },
    },
  },
})
