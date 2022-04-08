import rn from 'random-number'
import errorFactory from "../errors/errorFactory.js";
import * as ErrorConst from "../errors/constants.js";
import moment from 'moment-timezone';
import user from '../models/user.js';
import * as mailTool from '../lib/mail.js'

export default class MutualFundService {
  constructor(_db_mutual_fund, _db_user, _db_order, _db_navHistory, _db_currency_exchange) {
    this._db_mutual_fund = _db_mutual_fund;
    this._db_user = _db_user;
    this._db_order = _db_order;
    this._db_navHistory = _db_navHistory;
    this._db_currency_exchange = _db_currency_exchange;
  }

  async getMutualFundList(currency) {
    const mutualFundList = await this._db_mutual_fund.getAll();
    const exhangeRate = await this._db_currency_exchange.getExchangeRate(currency)
    mutualFundList.map(e=>{
      return {
        ...e,
        price: e.price_usd * exhangeRate
      }
    })

    return mutualFundList
  }

  async buyMutualFund(userId, mutualFundId, tradeDate, expenseUSD, isAfterClosingHours) {
    const userBalance = await this._db_user.getBalance(userId)
    const mutualFundUSDPrice = await this._db_mutual_fund.getPrice(mutualFundId);

    if (userBalance < mutualFundUSDPrice) throw errorFactory(ErrorConst.LACKOFBALANCE)

    // 超過交易截止日
    if (isAfterClosingHours) {
      this._db_order.create({
        user_id: userId,
        mutual_fund_id: mutualFundId,
        trade_date: moment(tradeDate).toDate(),
        expense_usd: expenseUSD,
        status: 'processing',
        amount: null
      })
      //交易截止日以前
    } else {
      this._db_order.create({
        user_id: userId,
        mutual_fund_id: mutualFundId,
        trade_date: moment(tradeDate).toDate(),
        expense_usd: expenseUSD,
        status: 'success',
        amount: userBalance / mutualFundUSDPrice
      })
    }
  }

  async settleNav() {
    const navList = []
    for (let index = 1; index < 5; index++) {
      navList.push({
        mutual_fund_id: index,
        nav: 34 + rn({
          min: -2,
          max: 2
        })
      })
    }
    this._db_navHistory.bulkCreate(navList)
  }

  async settleOrder() {
    const processingOrderList = await this._db_order.getProcessingOrder()
    const fundIdList = processingOrderList.map(e => e.mutual_fund_id)
    const userIdList = processingOrderList.map(e => e.user_id)

    const navList = await this._db_navHistory.getNearlyOneDayNav(fundIdList)
    const userList = await this._db_user.getUserBalanceEmailList(userIdList)
    let email_message
    let email_subject = "Mutual Fund Order Result"
    const updateList = []
    const fundNavMap = {}
    for (const processingOrder of processingOrderList) {
      let nav = fundNavMap[processingOrder.mutual_fund_id]
      if (!nav) {
        nav = navList.find(e => e.mutual_fund_id === processingOrder.mutual_fund_id)
        fundNavMap[processingOrder.mutual_fund_id] = nav
      }

      if (nav) {
        user = userList.find(e => e.id === processingOrder.user_id)
        // 使用者餘額足夠
        if (user.balance >= nav) {
          const amount = processingOrder.expense_usd / nav
          updateList.push(this._db_order.finishOrder(processingOrder.id, amount))
          updateList.push(this._db_user.decreaseBalance(user.id, processingOrder.expense_usd))

          email_message = mailTool.orderResultMessageGen('success')
        }
        // 使用者餘額不足
        else {
          updateList.push(this._db_order.failedOrder(processingOrder.id))

          email_message = mailTool.orderResultMessageGen('failed')
        }

        // 將購買結果email給使用者
        const mailOptions = {
          from: `"Paul"<pokemon80103@gmail.com>`,
          to: `${user.email}`,
          subject: email_subject,
          text: email_message,
        };

        transporter.verify().then(() => {
          //Send Email
          transporter.sendMail(mailOptions);
          console.log('send Email success!');
        }).catch((err) => {
          console.log(err);
        });
      }
    }

    await Promise.all(updateList)
    return null
  }
}
