const fs = require("fs");
const path = require("path");
const sendMail = require("../lib/emailSender");

module.exports.sendGmail = async (req, res) => {
  // const fileAttachments = [
  //   {
  //     filename: "attachment1.txt",
  //     content: "This is a plain text file sent as an attachment",
  //   },
  //   {
  //     path: path.join(__dirname, "./attachment2.txt"),
  //   },
  //   {
  //     filename: "websites.pdf",
  //     path: "https://www.labnol.org/files/cool-websites.pdf",
  //   },

  //   {
  //     filename: "image.png",
  //     content: fs.createReadStream(path.join(__dirname, "./attach.png")),
  //   },
  // ];

  const options = {
    to: "donattervin@gmail.com",
    // cc: 'cc1@example.com, cc2@example.com',
    // replyTo: 'amit@labnol.org',
    subject: "🚀 New Quote Arrived from dragongold0808@gmail.com",
    text: "This email is sent from the command line",
    html: `<p>🙋🏻‍♀️ ${req.body.name} sent you some quotes.</p><p>He/She offered <b>${req.body.budget}$</b> for the following question.</p>
    <p>His/Her Email address is ${req.body.email}</p>
    <p>He/She said "${req.body.instructions}"</p>
    <p>His/Her Phone number: "${req.body.phone}"</p>
    <p>-------------------------------------</p>
    ${req.body.content}`,
    attachments: null,
    textEncoding: "base64",
    headers: [
      { key: "X-Application-Developer", value: "Amit Agarwal" },
      { key: "X-Application-Version", value: "v1.0.0.2" },
    ],
  };

  sendMail(options)
    .then((messageId) => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "An error occurred" });
    });
};
