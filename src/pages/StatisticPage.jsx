import React from 'react'
import { Chart } from '../components/Chart'

export function StatisticPage() {
  return (
    <section>
      <Chart title="Confirmed Transactions" data="confirmedtransactions" description="Meowwww" color="blue" />
      <Chart title="Market Price" data="marketprice" description="Meowwww" color="red" />
    </section>
  )
}
