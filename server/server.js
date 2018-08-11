import express from 'express';
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

export const app = express();

app.set('view engine', 'ejs');

app.use('/', express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));

app.post('/contact', function (req, res){
  let mailOpts, smtpTrans;
  var username = process.env.GMAIL_USERNAME,
  password = process.env.GMAIL_PASSWORD;
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: username,
      pass: password
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: username,
    subject: 'New message from your personal website',
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}
    \n Phone Number:${req.body.phone}
    `

  };
  smtpTrans.sendMail(mailOpts, function (error, response){
    if(error){
      console.log(error);
    }
    else {
      console.log('Message sent:' + response.response)
      res.send(200);
    }
  });
});
