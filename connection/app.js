const contract = require('truffle-contract');

const CreditExchange_artifact = require('../build/contracts/CreditExchange.json');
var CreditExchange = contract(CreditExchange_artifact);

module.exports = {
  getPerson: function (type, idCardNumber, callback) {
    var self = this;

    let creditExchangeInstance;

    // Bootstrap the CreditExchange abstraction for Use.
    CreditExchange.setProvider(self.web3.currentProvider);

    // Get the initial account balance so it can be displayed.

    CreditExchange.deployed()
      .then(instance => {
        creditExchangeInstance = instance;
        return creditExchangeInstance.getPerson.call(idCardNumber, type, { from: '0xd98da5d0f0e96ce7d431b06b041bc2f4df815d6e' });
      })
      .then(result => {
        callback(result);
      })
      .catch(err => {
        console.log(`Error: ${err}`);
      });

  },

  addCase: function (creditInfo, callback) {
    var self = this;

    let creditExchangeInstance;

    // Bootstrap the CreditExchange abstraction for Use.
    CreditExchange.setProvider(self.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    CreditExchange.deployed()
      .then(instance => {
        console.log(creditInfo.idCardNumber);
        console.log(creditInfo.kind);
        console.log(creditInfo.isSuccessful);
        console.log(creditInfo.amount);
        creditExchangeInstance = instance;
        return creditExchangeInstance.addCase(
          creditInfo.idCardNumber,
          creditInfo.kind,
          creditInfo.isSuccessful,
          creditInfo.amount,
          {
            from: '0xd98da5d0f0e96ce7d431b06b041bc2f4df815d6e',
            gas: 200000
          }
        )
      })
      .then(doc => {
        result = 'success';
        callback(result);
      })
      .catch(err => {
        result = 'fail';
        callback(result);
      });

  }
}
