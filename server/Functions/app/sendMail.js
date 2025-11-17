const nodemailer = require('nodemailer')

async function sendMail(email, subject, body) {
    // Host account
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "Your gmail", // SMTP gmail
            pass: "your app generated Password" //app Generated password
        }
    })

    const mailOptions = {
        from: "SMTP gmail you set",
        to: "where you want to reveive it",
        replyTo: email, //Client gmail
        subject: subject,
        text: body
    };

    const info = await transporter.sendMail(mailOptions)
    console.log("Mail sent", info.messageId)
    return info.messageId

}

module.exports = { sendMail }
