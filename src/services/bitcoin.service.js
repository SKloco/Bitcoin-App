//imports
import axios from 'axios'
import { saveToStorage, loadFromStorage } from './storage.service'

//keys
const RATE_KEY = 'bitcoinRate'
const MarketPrice_KEY = 'bitcoinRate'

//cache
var gRateCache = loadFromStorage(RATE_KEY) || {}
var gMarketPriceCache = loadFromStorage(RATE_KEY) || []

//params
const currency = USD

//functions
async function getRate(coins = 1) {
  if (gRateCache.length && gRateCache[coins]) {
    return new Promise((resolve) => resolve(gRateCache[coins]))
  }
  const getRateUrl = `https://blockchain.info/tobtc?currency=${currency}&value=${coins}`
  try {
    var res = await axios.get(getRateUrl)
    res = res.data
    gRateCache[coins] = res
    saveToStorage(RATE_KEY, gRateCache)
    return res
  } catch (err) {
    console.log(err)
    throw err
  }
}
async function getMarketPrice() {
  if (gMarketPriceCache.length) {
    return new Promise((resolve) => resolve(gMarketPriceCache))
  }
  const getMarketPriceUrl = `https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`
  try {
    var res = await axios.get(getMarketPriceUrl)
    res = res.data.values
    gMarketPriceCache = res
    saveToStorage(MarketPrice_KEY, gMarketPriceCache)
    return res
  } catch (err) {
    console.log(err)
    throw err
  }
}

function getConfirmedTransactions() {
  //   return
}

//exports
export default {
  getRate,
  getMarketPrice,
  getConfirmedTransactions,
}
