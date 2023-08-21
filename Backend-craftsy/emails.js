const sendGrid = require("@sendgrid/mail");
require("dotenv").config();

sendGrid.setApiKey(
  "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"
);

const message = {
  to: "mirjibranhussain@gmail.com",
  from: {
    name: "Craftsy Account",
    email: "mirjibranhussain@gmail.com",
  },
  subject: "Reset Password Link",
  html: "<h3>Here is your reset password link </h3>",
};

const sendEmail = async () => {
  try {
    await sendGrid.send(message);
    console.log("Email sent Successfully");
  } catch (e) {
    console.log("Cannot send email.Some error occured");
  }
};

sendEmail();
