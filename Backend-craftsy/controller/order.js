const { Order, CartItem } = require("../models/order");
const { updateOne } = require("../models/user");

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
exports.getStatusValues = async (req, res) => {
  try {
    res.json(CartItem.schema.path("status").enumValues);
  } catch (e) {
    console.log(`ae biduuuuu: ${e}`);
  }
};

exports.orderById = async (req, res, next, id) => {
  try {
    const order = Order.findById(id)
      .populate("products.product", "name price")
      .exec();
    if (!order) {
      return res.status(400).json({
        message: `No order found having order id as ${id}`,
      });
    }
    req.order = order;
    next();
  } catch (e) {
    console.log(e);
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.body.orderId);

    // Find the index of the product within the products array
    const productIndexToUpdate = order.products.findIndex(
      (product) => product._id.toString() === req.body.productId
    );
    console.log(productIndexToUpdate);

    // Update the status of the product
    if (productIndexToUpdate !== -1) {
      order.products[productIndexToUpdate].status = req.body.status; // Set the new status here
    } else {
      return res.status(404).json({ error: "Product not found in the order" });
    }

    // Save the updated order
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

exports.getOrderStatus = async (req, res) => {
  try {
    const order = Order.findById(req.order._id);
    if (!order) {
      return res.status(400).json({ message: "No order with this id found" });
    }
    const status = order.status;
    return res.json(status);
  } catch (e) {
    return res.json({ error: e.message });
  }
};
