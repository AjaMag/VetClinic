// emailController.js
// program to send emails through a gmail account
// the gmail account is open for API interaction
// References:
//   https://www.w3schools.com/nodejs/nodejs_email.asp
//   https://stackoverflow.com/questions/45478293/username-and-password-not-accepted-when-using-nodemailer
 
// Dependencies
require("dotenv").config()
const emailKeys = require('../emailkeys')
const nodemailer = require('nodemailer')

module.exports = {
   
  send: function (req, res) {  
     
    let emailData = req.body
    
    console.log('send: function - ', emailData)

    sendEmail(emailData)
     .then(news => res.json(news))
     .catch(err => res.status(422).json(err))
  }
}

function sendEmail(emailData) {
  return new Promise(function (resolve, reject) {
    resolve(sendEmailToProvider(emailData))
  })
}

async function sendEmailToProvider (emailData) {

  // Transporter: Holds server information
  //              including user account info
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: emailKeys.gmailKeys.user,
      pass: emailKeys.gmailKeys.pwd
    }
  })

 // Email Options: The main structure for teh email
  const mailOptions = {
    from: emailKeys.gmailKeys.user,
    to: emailData.to,
    subject: emailData.subject,
    text: emailData.text
  }
  
  // send the email and wait for a response
  let result = await sendGmail(transporter,mailOptions)

  return result
}

async function sendGmail(transporter,mailOptions) {    
  let result = transporter.sendMail(mailOptions)
  return result
}


