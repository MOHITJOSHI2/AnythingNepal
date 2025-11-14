const nodemailer = require('nodemailer')

async function sendMail(email, subject, body) {
    // Host account
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "specturet@gmail.com",
            pass: "cgob oiyw tzjv jibb" //app Generated password
        }
    })

    const mailOptions = {
        from: "specturet@gmail.com",
        to: "itsspyner@gmail.com",
        replyTo: email,
        subject: subject,
        text: body
    };

    const info = await transporter.sendMail(mailOptions)
    console.log("Mail sent", info.messageId)
    return info.messageId

}

module.exports = { sendMail }