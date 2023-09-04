const User = require("../models/user");
const Product = require("../models/product");
const { Order } = require("../models/order");
const mg = require("mailgun-js");
const otpGenerator = require("otp-generator");
require("dotenv").config();

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

exports.read = (req, res) => {
  console.log(req.profile);
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.update = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are Mandatory" });
    }
    const user = await User.findOneAndUpdate(
      { _id: req.profile._id },
      {
        $set: req.body,
      },
      { new: true }
    );
    user.hashed_password = undefined;
    user.salt = undefined;
    return res.json(user);
  } catch (e) {
    return res.status(400).json({ error: e.message });
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
        //  transactionId:
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

exports.decreaseQuantityAndIncreaseSold = async (req, res, next) => {
  try {
    console.log("jojo");
    const bulkUpdate = req.body.order.products.map((product) => {
      console.log(product);
      return {
        updateOne: {
          filter: { _id: product.id },
          update: {
            $inc: { quantity: -product.quantity, sold: +product.quantity },
          },
        },
      };
    });
    await Product.bulkWrite(bulkUpdate, {});
    next();
  } catch (error) {
    return res.status(400).json({
      error: "Could not decrement the product quantity and increment sold",
    });
  }
};

exports.listOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "_id name email")
      .sort("-createdAt")
      .exec();

    const updatedProducts = orders.flatMap((order) => {
      {
        console.log(order);
      }

      return order.products
        .filter((singleProduct) => {
          return (
            singleProduct.createdBy.toString() === req.profile._id.toString()
          );
        })
        .map((matchingProduct) => ({
          productId: matchingProduct._id,
          userId: order.user._id,
          userName: order.user.name,
          userEmail: order.user.email,
          name: matchingProduct.name,
          price: matchingProduct.price,
          quantity: matchingProduct.quantity,
          orderId: order._id,
          address: order.address,
          transaction_id: order.transaction_id,
          amount: matchingProduct.amount,
          status: matchingProduct.status,
        }));
    });

    return res.status(200).json(updatedProducts);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.purchaseHistory = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.profile._id })
      .populate("user", "_id name")
      .sort("-createdAt")
      .exec();
    return res.json(orders);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};

exports.sendEmail = async (to, subject, message) => {
  try {
    const mailgun = () =>
      mg({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
      });
    emailInfo = {
      from: '"Jibran" <mirjibranhussain@gmail.com>',
      to: to,
      subject: subject,
      html: message,
    };
    mailgun().messages().send(emailInfo);
    console.log("Email sent Succesfully");
  } catch (e) {
    console.log(`The error is : ${e.message}`);
  }
};

exports.generateOTP = async (req, res) => {
  try {
    const OTP = otpGenerator.generate(6, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log(OTP);
    res.json({ otp: OTP });
  } catch (e) {
    console.log("Error in user.js");
  }
};

exports.sendOTP = async (req, res) => {
  try {
    console.log(`bye world`);
    const { to, subject, message } = req.body;
    const mailgun = () =>
      mg({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
      });
    emailInfo = {
      from: '"Jibran" <mirjibranhussain@gmail.com>',
      to: to,
      subject: subject,
      html: message,
    };
    mailgun().messages().send(emailInfo);
    console.log("OTP sent Succesfully");
    res.json({ message: "OTP send successfully" });
  } catch (e) {
    console.log(`The error is : ${e.message}`);
  }
};
