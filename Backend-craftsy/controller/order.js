const { Order } = require("../models/order");

exports.createOrder = async (req, res) => {
  try {
    req.body.order.user = req.profile;
    console.log("here is the body of me");
    console.log(JSON.stringify(req.body));
    const order = new Order(req.body.order);

    await order.save();
    res.status(201).json({ msg: "New order has been created", order });
    console.log(`hi this is your order ${order}`);
    console.log(`this is end of order`);
  } catch (e) {
    console.log(`Order Creation error: ${e.message}`);
  }
};
