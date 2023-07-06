const nodemailer = require('nodemailer');

exports.send_Mail = (mail, token) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { 
               user: "hasmikhayrapetyan1988@gmail.com",
               pass: "vlxobeicunmjwhel"
              },tls:{
                     rejectUnauthorized: false
                    }
    });
        
    const mailOptions = {
        from: "hasmikhayrapetyan1988@gmail.com",
        to: mail,
        subject: 'Email verification',
        text: `http://localhost:5000/verify/${token}`
    };
    
    transporter.sendMail(mailOptions, function(err, info){ 
        if (err) {
          console.log(err);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }

   