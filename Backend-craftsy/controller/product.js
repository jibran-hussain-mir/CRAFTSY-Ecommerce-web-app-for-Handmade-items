const Product = require("../models/product");
const { IncomingForm } = require("formidable");
const fs = require("fs");

exports.create = (req, res) => {
  console.log(`Here is the creators id :${req.profile._id}`);
  const form = new IncomingForm();
  form.keepExtentions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(401).json({
        error: "Image could not be uploaded",
      });
    }
    const product = new Product(fields);
    product.createdBy = req.profile._id;

    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    console.log(product);
    if (files.photo) {
      if (files.photo.size > 1048576) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.filepath); // change path to filepath
      product.photo.contentType = files.photo.mimetype; // change type to mimetype
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.status(201).json({ result });
    });
  });
};

exports.productById = async (req, res, next, productId) => {
  try {
    console.log(`hi this : ${productId}`);
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(400)
        .json({ error: "Product with this ID does not exist" });
    }
    req.product = product;
    next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json({ product: req.product });
};

exports.remove = async (req, res) => {
  const product = await Product.deleteOne({ _id: req.product._id.toString() });
  return res
    .status(200)
    .json({ product, message: `Product has been deleted successfully` });
};

exports.update = async (req, res) => {
  try {
    const product = req.product;

    const { name, description, price, category, shipping, quantity } = req.body;

    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.shipping = shipping;
    product.quantity = quantity;

    if (req.file) {
      if (req.file.size > 1048576) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      product.photo.data = fs.readFileSync(req.file.path);
      product.photo.contentType = req.file.mimetype;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.list = async (req, res) => {
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  const order = req.query.order ? req.query.order : "asc";
  const limit = req.query.limit ? parseInt(req.query.limit) : 6;

  try {
    const products = await Product.find({})
      .populate("category")
      .sort([[sortBy, order]])
      .limit(limit)
      .exec();
    return res.json({ products });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

exports.listRelated = async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 6;
  try {
    const relatedProducts = await Product.find({
      _id: { $ne: req.product._id },
      category: req.product.category,
    })
      .select("-photo")
      .populate("category", "_id name")
      .limit(limit)
      .exec();
    if (!relatedProducts)
      return res.status(404).josn({ message: `No relevent products found` });
    return res.json({ relatedProducts });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

exports.listCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category", {}).exec();
    return res.json(categories);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

// Fetch Products created by a particular admin
exports.listProducts = async (req, res) => {
  try {
    const products = await Product.find({ createdBy: req.profile.id })
      .sort("-createdAt")
      .exec();
    return res.json(products);
  } catch (e) {
    console.log(e);
  }
};
exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    console.log(key);
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select("-photo")
    .populate("category", "name")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};
