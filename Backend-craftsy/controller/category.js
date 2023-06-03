const Category = require("../models/category");
const formidable = require("formidable");
const { IncomingForm } = require("formidable");
const fs = require("fs");

exports.create = async (req, res) => {
  const form = new IncomingForm();
  form.keepExtentions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(401).json({
        error: "Image could not be uploaded",
      });
    }
    const category = new Category(fields);

    const { name } = fields;

    if (!name) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (files.photo) {
      if (files.photo.size > 1048576) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      category.photo.data = fs.readFileSync(files.photo.filepath); // change path to filepath
      category.photo.contentType = files.photo.mimetype; // change type to mimetype
    }
    category.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(201).json({ result });
    });
  });
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
