const Category = require("../models/category");

exports.create = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    ``;
    res.status(201).json({ category });
  } catch (e) {
    res.status(420).json({ error: e.message });
  }
};

exports.categoryById = async (req, res, next, categoryId) => {
  try {
    const category = await Category.findById({ _id: categoryId }).exec();
    if (!category) {
      return res
        .status(404)
        .json({ error: `Category with this ID does not exist` });
    }
    req.category = category;
    next();
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.read = (req, res) => {
  return res.json({ category: req.category });
};

exports.update = async (req, res) => {
  try {
    const category = req.category;
    category.name = req.body.name;
    await category.save(); // save() method returns a promise not a thenable
    res.status(200).json({ category });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete({
      _id: req.category._id.toString(),
    }).exec();
    return res.status(200).json({ category });
  } catch (e) {
    return res.status(500).json({ error: "e.message" });
  }
};

exports.list = async (req, res) => {
  const result = Category.find().exec((err, result) => {
    if (err) {
      return res.status(500).json({ error: "hi" });
    }
    return res.json({ result });
  });
};

// exports.list = async (req, res) => {
//   try {
//     console.log("is it");
//     // const categories = await Category.find({});
//     // return res.json({ categories });
//     return res.json({ name: "hi" });
//   } catch (e) {
//     return res.status(500).json({ error: "hi" });
//   }
// };
