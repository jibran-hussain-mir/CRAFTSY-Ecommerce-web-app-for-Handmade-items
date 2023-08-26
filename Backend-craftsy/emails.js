// const sendGrid = require("@sendgrid/mail");
// require("dotenv").config();

// sendGrid.setApiKey(

// );

// const message = {
//   to: "mirjibranhussain@gmail.com",
//   from: {
//     name: "Craftsy Account",
//     email: "mirjibranhussain@gmail.com",
//   },
//   subject: "Reset Password Link",
//   html: "<h3>Here is your reset password link </h3>",
// };

// const sendEmail = async () => {
//   try {
//     await sendGrid.send(message);
//     console.log("Email sent Successfully");
//   } catch (e) {
//     console.log("Cannot send email.Some error occured");
//   }
// };

// sendEmail();
var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey =
  "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";
var apiInstance = new SibApiV3Sdk.EmailCampaignsApi();
var emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();
emailCampaigns.name = "Campaign sent via the API";
emailCampaigns.subject = "My subject";
emailCampaigns.sender = {
  name: "Jibran Hussain Mir",
  email: "mirjibranhussain@gmail.com",
};
emailCampaigns.type = "classic";
emailCampaigns.htmlContent =
  "Congratulations! You successfully sent this example campaign via the Brevo API."; // Fixed syntax here
emailCampaigns.recipients = { listIds: [2, 7] }; // Fixed syntax here
emailCampaigns.scheduledAt = "2018-01-01 00:00:01"; // Fixed syntax here

emailCampaigns.to = [
  { name: "Recipient Name", email: "mirjibranhussain@gmail.com" },
];

// Make the call to the client
apiInstance.createEmailCampaign(emailCampaigns).then(
  function (data) {
    console.log(
      "API called successfully. Returned data: " + JSON.stringify(data)
    ); // Convert data to JSON string
  },
  function (error) {
    console.error(error);
  }
);
