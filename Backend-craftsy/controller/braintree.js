const braintree = require("braintree");
require("dotenv").config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
exports.generateToken = (req, res) => {
  gateway.clientToken.generate({}, function (err, response) {
    console.log("error is here");
    console.log(`This is the erRor: ${err}`);
    if (err) {
      res.status(500).json(err);
    } else {
      res.send(response);
    }
  });
};
exports.processPayment = (req, res) => {
  const nonceFromClient = req.body.paymentMethodNonce.nonce;
  const amount = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amount,
      paymentMethodNonce: nonceFromClient,
      options: {
        submitForSettlement: true,
      },
    },
    function (err, result) {
      if (err) {
        console.log(`From Braintree Controller : ${err.message}`);
        return;
      } else {
        console.log(`Here is transaction details : ${result.transaction}`);
        res.json(result.transaction.id);
      }
    }
  );
};
