const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
      unique: true,
    },
    photo: {
      data: Buffer, //The data property is used to specify the name of the property that will hold the binary data in the Mongoose schema, while type is used to specify the data type of the field
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
