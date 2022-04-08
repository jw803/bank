import cron from 'node-cron'
import ioc from '../lib/IOC.js'
import * as SERVICETYPE from '../ioc/constants.js'

const mutualFundServices = ioc.use(SERVICETYPE.MUTUALFUND)

// 每3天產生最新結算的Nav
cron.schedule('* * */3 * *', () => {
    console.log('start cron job: 結算Nav')
    mutualFundServices.settleNav()
}, {
    scheduled: true,
    timezone: "America/Chicago"
})

// 每12小時將status為processing的order做結算
cron.schedule('* */12 * * *', () => {
    console.log('start cron job: 結算處理中的order')
    mutualFundServices.settleOrder()
}, {
    scheduled: true,
    timezone: "America/Chicago"
})