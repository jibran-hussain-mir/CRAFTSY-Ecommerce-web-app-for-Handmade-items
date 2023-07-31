const User = require("../models/user");
exports.userById = async (req, res, next, userId) => {
  try {
    const user = await User.findById(userId);
    if (!User) {
      return res.status(404).json({ error: "User does not exist" });
    }
    req.profile = user;
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addOrderToUserHistory = async (req, res, next) => {
  try {
    const history = [];
    req.body.order.products.forEach((product) => {
      history.push({
        _id: product.id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        // transactionId:
      });
    });
    // console.log(req.body.order.products);
    const updatedUserDocument = await User.findOneAndUpdate(
      { _id: req.profile._id },
      { $push: { history: history } },
      { new: true }
    );
    next();
  } catch (e) {
    return res.status(400).json({ error: "Could not update user history" });
  }
};

// exports.decreaseQuantityAndIncreaseSold = async (req, res, next) => {
//   try {
//     const updatedUserDocument = await User.findOneAndUpdate(
//       { _id: req.profile._id },
//       { sold: sold + 1, quantity: quantity - 1 }
//     );
//     next();
//   } catch (error) {
//     return res.json({
//       error: "Could not decrement the product quantity and increment sold",
//     });
//   }
// };
