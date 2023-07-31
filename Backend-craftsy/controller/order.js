const { Order } = require("../models/order");

exports.createOrder = async (req, res) => {
  try {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    await order.save();
    console.log(`hi this is your order ${order}`);
    console.log(`this is end of order`);
  } catch (e) {
    console.log(`Order Creation error: ${e.message}`);
  }
};
