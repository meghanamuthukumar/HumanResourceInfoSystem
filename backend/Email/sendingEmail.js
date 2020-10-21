const nodemailer = require("nodemailer");

exports.sendMailer = function (to, subject, text) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: '..', // email goes here
        pass: '..' //password goes here
    },
  });

  let mailOptions = {
    from: "..", //email goes here
    to: to,
    subject: subject,
    text: text
  };
  
  transporter.sendMail(mailOptions, function (err, info) {
    console.log('Email sent:::' +JSON.stringify(mailOptions));
    if (err) {
      console.log(err);
    } else {
      console.log("Email successfully sent:::" + info.response);
    }
  });
};