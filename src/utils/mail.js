const nodemailer = require('nodemailer')

const sendEmail = async ({ body, subject }) => {
    console.log('sendEmail sendEmail');

    let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "sagaryc111@gmail.com",
            pass: "xtrainn213"
        }
    });
    const message = {
        from: "sagaryc111@gmail.com",
        to: "rahulvpakhare@gmail.com",
        subject: subject,
        text: "Hello there!  Here I am attaching excel report for Sales Progress! PFA.",
        html: body
    };
    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log('Errpr Email', err)
            return false;
        } else {
            console.log('Success')
            return true;
        }
    });

    return true
}


module.exports = {
    sendEmail
}