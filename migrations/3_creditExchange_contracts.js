var CreditExchange = artifacts.require("./CreditExchange.sol");

module.exports = function (deployer) {
  deployer.deploy(CreditExchange);
};