import { React, Component } from 'react'
import { Sparklines, SparklinesLine,SparklinesBars } from 'react-sparklines'
import bitcoinService from '../services/bitcoin.service'

export class Chart extends Component {
  state = {
    data: null,
  }

  componentDidMount() {
    this.loadData()
  }

  loadData = async () => {
    const data = await bitcoinService.getMarketPrice()
    var newData = []
    data.forEach(element => {
      newData.push( element.x )
      newData.push(element.y)
    });
    this.setState({ data: newData })
  }

  render() {
    const { data } = this.state
    if (!data) return <div>Loading...</div>
    return (
      <div>
        <section>
          <Sparklines data={data}>
            <SparklinesLine color="blue" />
          </Sparklines>
        </section>
      </div>
    )
  }
}
