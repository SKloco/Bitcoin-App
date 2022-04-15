import { React, Component } from 'react'
import { Sparklines, SparklinesLine, SparklinesBars, SparklinesSpots } from 'react-sparklines'
import bitcoinService from '../services/bitcoin.service'

export class Chart extends Component {
  state = {
    MPdata: null,
    CTdata: null,
  }

  componentDidMount() {
    this.loadDataMarketPrice()
    this.loadDataConfirmedTransactions()
  }

  // loadChart = async () => {
  //   const { title, data, description, color } = this.props
  //   return (
  //     <div>
  //       <h1>{title}</h1>
  //     </div>
  //   )
  // }

  loadDataMarketPrice = async () => {
    const data = await bitcoinService.getMarketPrice()
    var newData = []
    data.forEach((element) => {
      // newData.push(element.x)
      newData.push(element.y)
    })
    this.setState({ MPdata: newData })
  }
  loadDataConfirmedTransactions = async () => {
    const data = await bitcoinService.getConfirmedTransactions()
    var newData = []
    data.forEach((element) => {
      // newData.push(element.x)
      newData.push(element.y)
    })
    this.setState({ CTdata: newData })
  }

  render() {
    const { MPdata, CTdata } = this.state
    if (!MPdata || !CTdata) return <div>Loading...</div>
    return (
      <div>
        <section>
          <h1>Market Price</h1>
          <Sparklines data={MPdata} margin={6}>
            <SparklinesLine style={{ strokeWidth: 3, stroke: '#336aff', fill: 'none' }} />
            <SparklinesSpots size={4} style={{ stroke: '#336aff', strokeWidth: 3, fill: 'white' }} />
          </Sparklines>
        </section>
        <section>
          <h1>Confirmed Transactions</h1>
          <Sparklines data={CTdata}>
            <SparklinesBars color="blue" />
          </Sparklines>
        </section>
      </div>
    )
  }
}
