const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const Web3 = require('web3');
const truffle_connect = require('./connection/app.js');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT POST PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.get('/creditInfo/:type/:idCardNumber', (req, res) => {
  console.log("**** GET /getCreditInfo ****");
  const type = req.params.type;
  const idCardNumber = req.params.idCardNumber;

  truffle_connect.getPerson(type, idCardNumber, function (docs) {
    res.status(200).json({docs});
  })
});

app.post('/creditInfo', (req, res) => {
  console.log(req.body);
  let newCreditInfo = req.body.creditInfo;

  truffle_connect.addCase(newCreditInfo, (result) => {
    if(result === 'success') {
      res.status(200).json({
        message: 'Success!'
      });
    }
    else if(result === 'fail') {
      message: 'Fail'
    }
  });
});

app.listen(port, () => {

  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    truffle_connect.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  console.log("Express Listening at http://localhost:" + port);

});
